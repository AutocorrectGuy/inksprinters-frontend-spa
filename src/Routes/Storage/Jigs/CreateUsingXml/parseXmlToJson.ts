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