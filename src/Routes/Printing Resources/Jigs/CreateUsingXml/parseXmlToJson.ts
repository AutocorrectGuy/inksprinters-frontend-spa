import { JigTemplate, OriginType } from '../../../../libraries/dexie/models/jig.model'
import { strToNumbers } from '../utils/converter.utils'

export type JigTemplateAsXML = {
  Name?: string
  PageSize?: string
  Margin?: string
  Origin?: string
  OriginOffset?: string
  IsTemplate?: string
  Type?: string
  Copies?: string
  LayoutSpace?: string
  AllAlignment?: string
  TemplateElementAdjustment?: string
  TemplateGroup?: string

  // Flattened TemplateElement attributes with "Cell" prefix
  CellElementSize?: string
  CellImageOffset?: string
  CellImageAlignment?: string
  CellEnableCenterOffset?: string
  CellEnableAlignment?: string
  CellEnableCenterOrigin?: string
  CellEnableCenterSpacing?: string
  CellBackgroundImage?: string
}

// Using the same attributeRegexMap as defined previously
const attributeRegexMap: { [key: string]: RegExp } = {
  Name: /Name="([^"]+)"/,
  PageSize: /PageSize="([^"]+)"/,
  Margin: /Margin="([^"]+)"/,
  Origin: /Origin="([^"]+)"/,
  OriginOffset: /OriginOffset="([^"]+)"/,
  IsTemplate: /IsTemplate="([^"]+)"/,
  Type: /Type="([^"]+)"/,
  Copies: /Copies="([^"]+)"/,
  LayoutSpace: /LayoutSpace="([^"]+)"/,
  AllAlignment: /AllAlignment="([^"]+)"/,
  TemplateElementAdjustment: /TemplateElementAdjustment="([^"]+)"/,
  TemplateGroup: /TemplateGroup="([^"]+)"/,

  // Element attributes with "Cell" prefix
  CellElementSize: /ElementSize="([^"]+)"/,
  CellImageOffset: /ImageOffset="([^"]+)"/,
  CellImageAlignment: /ImageAlignment="([^"]+)"/,
  CellEnableCenterOffset: /EnableCenterOffset="([^"]+)"/,
  CellEnableAlignment: /EnableAlignment="([^"]+)"/,
  CellEnableCenterOrigin: /EnableCenterOrigin="([^"]+)"/,
  CellEnableCenterSpacing: /EnableCenterSpacing="([^"]+)"/,
  CellBackgroundImage: /BackgroundImage="([^"]+)"/,
}

export const parseXmlToTemplates = (xmlString: string): JigTemplateAsXML[] => {
  const templateLayoutRegex = /<TemplateLayout.*?<\/TemplateLayout>/gs
  const templateLayoutArrAsStrings = xmlString.match(templateLayoutRegex) || []

  const templateLayouts: JigTemplateAsXML[] = templateLayoutArrAsStrings.map((layoutXml) => {
    let templateLayout: JigTemplateAsXML = {}

    Object.entries(attributeRegexMap).forEach(([key, regex]) => {
      const match = layoutXml.match(regex)
      if (match) templateLayout[key as keyof JigTemplateAsXML] = match[1]
    })
    return templateLayout
  })

  return templateLayouts
}

export const jigXMLTemplateToJigTemplate = (t: JigTemplateAsXML): JigTemplate => {
  const pageSize = strToNumbers(t.PageSize, 2)
  const originOffset = strToNumbers(t.OriginOffset, 2)
  const layoutSpace = strToNumbers(t.LayoutSpace, 2)
  const cellElementSize = strToNumbers(t.CellElementSize, 2)

  return {
    name: t.Name ?? 'Unnamed Jig',
    pageSizeX: pageSize[0],
    pageSizeY: pageSize[1],
    // margin not needed
    origin: t.Origin as OriginType ?? 'LowerRight',
    originOffsetX: originOffset[0],
    originOffsetY: originOffset[1],
    // isTemplate not needed
    // type not needed
    copies: Number(t.Copies ?? 0),
    layoutSpaceX: layoutSpace[0],
    layoutSpaceY: layoutSpace[1],
    // allAlignment not needed
    // templateGroup not needed
    cellElementSizeX: cellElementSize[0],
    cellElementSizeY: cellElementSize[1],
    // CellImageOffset not needed
    // CellImageAlignment not needed
    // CellEnableCenterOffset not needed
    // EnableAlignment not needed
    // EnableCenterOrigin not needed
    // EnableCenterSpacing not needed
    // BackgroundImage not needed
    created_at: 0,
  }
}
// Example XML input (use the provided XML string)
const textXmlString = `<TemplateLayout 
  Name="3500 EuroNorm Special parkeerschijf" 
  PageSize="31.4960632 25.1968498" 
  Margin="0 0 0 0" 
  Origin="LowerRight" 
  OriginOffset="0.2598425 0.2440945" 
  IsTemplate="False" 
  Type="CopyTemplateLayout" 
  Copies="15" 
  LayoutSpace="1.102362 1.929134" 
  AllAlignment="MiddleCenter" 
  TemplateElementAdjustment="0 -1 0.2598425 0.2440945 0 0|1 -1 6.610237 0.2440945 0 0|2 -1 12.96063 0.2440945 0 0|3 -1 19.31102 0.2440945 0 0|4 -1 25.66142 0.2440945 0 0|5 -1 0.2598425 7.488189 0 0|6 -1 6.610237 7.488189 0 0|7 -1 12.96063 7.488189 0 0|8 -1 19.31102 7.488189 0 0|9 -1 25.66142 7.488189 0 0|10 -1 0.2598425 14.73228 0 0|11 -1 6.610237 14.73228 0 0|12 -1 12.96063 14.73228 0 0|13 -1 19.31102 14.73228 0 0|14 -1 25.66142 14.73228 0 0" 
  TemplateGroup="False">

  <TemplateElement 
  ElementSize="5.248032 5.31496" 
  ImageOffset="0 0" 
  ImageAlignment="MiddleCenter" 
  EnableCenterOffset="False" 
  EnableAlignment="False" 
  EnableCenterOrigin="False" 
  EnableCenterSpacing="False" 
  BackgroundImage="" />
</TemplateLayout>`
