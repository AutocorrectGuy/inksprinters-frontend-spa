import { DexieJsTable } from '../utils/schema'

export type Jig = {
  id?: number
  name: string

  // Media Size
  width?: number | null
  height?: number | null
  is_origin_lower_right?: boolean | null

  // Element
  is_group?: boolean | null
  is_first_element_centered?: boolean | null
  cell_width?: number | null
  cell_height?: number | null
  offset_x?: number | null
  offset_y?: number | null
  gap_x?: number | null
  gap_y?: number | null
  count?: number | null
  adjustment_x?: number | null
  adjustment_y?: number | null
  
  // Image
  is_image_center_offest?: boolean | null
  image_center_offset_x?: number | null
  image_center_offset_y?: number | null
  align_in_element?: number | null
  bg_image?: ArrayBuffer | null

  created_at: number
}

// Define the DexieJsTable for Primer
export const jigModel: DexieJsTable<Jig> = {
  id: { type: 'number', validation: [], autoIncrement: true },

  // Media Size
  name: { type: 'string', validation: ['isValidText', 'isRequired'], unique: true },
  width: { type: 'number', validation: ['isNumeric'] },
  is_origin_lower_right: { type: 'boolean', validation: ['isBoolean'] },
  
  // Element  
  is_group: { type: 'boolean', validation: ['isBoolean'] },
  is_first_element_centered: { type: 'boolean', validation: ['isBoolean'] },
  height: { type: 'number', validation: ['isNumeric'] },
  cell_width: { type: 'number', validation: ['isNumeric'] },
  cell_height: { type: 'number', validation: ['isNumeric'] },
  offset_x: { type: 'number', validation: ['isNumeric'] },
  offset_y: { type: 'number', validation: ['isNumeric'] },
  gap_x: { type: 'number', validation: ['isNumeric'] },
  gap_y: { type: 'number', validation: ['isNumeric'] },
  count: { type: 'number', validation: ['isNumeric'] },
  adjustment_x: { type: 'number', validation: ['isNumeric'] },
  adjustment_y: { type: 'number', validation: ['isNumeric'] },
  
  // Image
  is_image_center_offest: { type: 'boolean', validation: ['isBoolean'] },
  image_center_offset_x: { type: 'number', validation: ['isNumeric'] },
  image_center_offset_y: { type: 'number', validation: ['isNumeric'] },
  align_in_element: { type: 'number', validation: ['isNumeric'] },
  bg_image: { type: 'image', validation: []},

  created_at: { type: 'number', validation: ['isNumeric'] },
}
