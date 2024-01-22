export const getBorderRadiusClasses = (
  isFirstChild: boolean,
  isLastChild: boolean,
  isMainSidebarBtn: boolean,
): string => {
  if (isFirstChild && isLastChild) {
    return 'rounded-[24px]'
  }
  if (isFirstChild) {
    return `${isMainSidebarBtn ? 'rounded-tr-[24px]' : 'rounded-t-[24px]'} border-b-[6px] border-b-[#242C29]`
  } else if (isLastChild) {
    return `${isMainSidebarBtn ? 'rounded-br-[24px]' : 'rounded-b-[24px]'}`
  } else {
    return 'border-b-[6px] border-b-[#242C29]'
  }
}
export const selectedBtnStyles =
  'bg-gradient-to-r from-[#000621]/[85%] from-15% via-[#2d0a14]/80 to-[#721717]/80 text-[#cfcbc4]'

export const btnClass =
  'flex items-center border-[#242C29] py-2 hover:from-[#c8c3bb] hover:via-[#c8c3bb] hover:to-[#c8c3bb] hover:text-[#1b1b1a]'
