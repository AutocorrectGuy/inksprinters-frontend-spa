import { useEffect, useState } from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import { onFileSelect } from './utils/readExcelFile'
import { db } from '../../../libraries/dexie/db'
import { Article } from '../../../libraries/dexie/models/article.model'
import { JigTemplate } from '../../../libraries/dexie/models/jig.model'
import moment from 'moment'

type MergedLogEntry = {
  // Log properties
  article_number: string
  order_size: number
  date: number

  // Joined ArticleData properties
  articleName?: string
  articleNumber?: string // Optional because it might not exist in every merged log
  primingDuration?: number | null // Marking as optional to reflect possible absence
  primer?: string | null // Optional for the same reason
  copies?: number // Optional since not all logs might have this data

  // calculations
  totalPrimingDuration?: number | null
}

const Main = () => {
  const [logs, setLogs] = useState<MergedLogEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalPrimingDurations, setTotalPrimingDuration] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const loadedLogs = await db.chemical_usage_logs.orderBy('date').toArray()

        // Use a for loop to push unique article numbers into the array
        let uniqueArticleNumbers: string[] = []
        for (const log of loadedLogs) {
          if (!uniqueArticleNumbers.includes(log.article_number)) uniqueArticleNumbers.push(log.article_number)
        }

        // Get articles with the selected `id`s
        let articlesFetched = await db.articles.where('number').anyOf(uniqueArticleNumbers).toArray()
        const articlesToJoin = articlesFetched.reduce((acc, article) => {
          // filter out duplicate articles and map only `name`, `number` `jig_id` and `priming_duration`
          const exists = acc.find((a) => a.number === article.number)
          if (!exists) {
            acc.push({
              name: article.name,
              number: article.number,
              jig_id: article.jig_id,
              primer_id: article.primer_id,
              priming_duration: article.priming_duration,
            })
          }
          return acc
        }, [] as Partial<Article>[])

        //  Get Primers for selected articles
        const primerIds: number[] = articlesToJoin
          .map((article) => article.primer_id)
          .filter((id): id is number => typeof id === 'number')
        const primersFetched = await db.primers.where('id').anyOf(primerIds).toArray()
        const primersToJoin = primersFetched.map((primer) => ({ id: primer.id, name: primer.name }))

        // Get Jigs for selected articles
        const jigIds: number[] = articlesToJoin
          .map((article) => article.jig_id)
          .filter((id): id is number => typeof id === 'number')
        const jigsFetched = await db.jigs.where('id').anyOf(jigIds).toArray()
        const jigsToJoin = jigsFetched.reduce((acc, jig) => {
          const exists = acc.find((a) => a.name === jig.name)
          if (!exists) acc.push({ id: jig.id, name: jig.name, copies: jig.copies })
          return acc
        }, [] as Partial<JigTemplate>[])

        // Join the tables
        const joinedData = articlesToJoin.map((article) => {
          const primer =
            typeof article.primer_id === 'number' ? primersToJoin.find((p) => p.id === article.primer_id) : null
          const jig = typeof article.jig_id === 'number' ? jigsToJoin.find((j) => j.id === article.jig_id) : null
          return {
            articleName: article.name,
            articleNumber: article.number,
            orderSize: 0,
            primingDuration: article.priming_duration,
            primer: primer ? primer.name : null,
            copies: jig ? jig.copies : 0,
          }
        })

        // Use joined data to display and calculate total priming time
        // Sum the total priming times in the same loop
        const totalPrimingTimes: { [key: string]: number } = {}

        const mergedLogs = loadedLogs.map((log) => {
          const matchingData = joinedData.find((article) => article.articleNumber === log.article_number)
          if (!matchingData) return log

          const { copies, primingDuration, primer } = matchingData
          const totalPrimingDuration =
            copies && copies > 0 && primingDuration && primingDuration > 0 && log.order_size
              ? Number(((log.order_size / copies) * primingDuration).toFixed(1))
              : null

          if (primer) {
            if (!totalPrimingTimes[primer]) {
              totalPrimingTimes[primer] = 0
            }
            totalPrimingTimes[primer] += totalPrimingDuration ?? 0
          }

          return {
            ...log, // Spread the log properties
            ...matchingData, // Spread the matching article properties (if any)
            totalPrimingDuration, // Include the calculated totalPrimingDuration
          }
        })

        // round the total priming times values, update the state
        for (const primer in totalPrimingTimes) totalPrimingTimes[primer] = Number(totalPrimingTimes[primer].toFixed(1))
        setTotalPrimingDuration(totalPrimingTimes)

        setLogs(mergedLogs)
      } catch (error) {
        console.error('Failed to fetch logs:', error)
        // Handle error, possibly update state to show an error message
      }
      setLoading(false)
    }

    fetchLogs()
  }, [])

  const LogTable = () => {
    return (
      <div className="rounded-md border border-white/20">
        <table className="table w-fit">
          <thead>
            <tr>
              <th>Art. No</th>
              <th>Order Size</th>
              <th>Copies</th>
              <th>Duration</th>
              <th>Total</th>
              <th>Primer</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={`log-row-${i}`}>
                <td>{log.article_number}</td>
                <td>{log.order_size}</td>
                <td>{log.copies}</td>
                <td>{log.primingDuration}</td>
                <td>{log.totalPrimingDuration}</td>
                <td>{log.primer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const TotalPrimingDurationTable = () => {
    const formatDuration = (durationInSeconds: number) => {
      return moment.utc(moment.duration(durationInSeconds, 'seconds').asMilliseconds()).format('HH:mm:ss')
    }

    return (
      <div className="rounded-md border border-white/20">
        <table className="table w-fit">
          <thead>
            <tr>
              <th>Primer</th>
              <th className="whitespace-pre-line">{`Total Priming Duration\n(HH:mm:ss)`}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(totalPrimingDurations).map(([primer, duration]) => (
              <tr key={primer}>
                <td>{primer}</td>
                <td>{formatDuration(duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <MainContentContainer h1="Daily chemicals usage">
      <div className="flex w-full justify-end p-4">
        <input type="file" className="file-input" onChange={(e) => onFileSelect(e)} />
      </div>
      <div className="flex items-start justify-evenly">
        {!loading ? !logs.length ? <div>No logs found</div> : <LogTable /> : <div>Loading ...</div>}
        {Object.keys(totalPrimingDurations).length ? <TotalPrimingDurationTable /> : <></>}
      </div>
    </MainContentContainer>
  )
}

export default Main
