export const styles = {
  sidebarWidth: 340,
  sideNavWidth: 400,
  topNavHeigh: 80,
  contentContainer: {
    h1Height: 60,
    margin: 20,
  },
  buttonHeight: 48,
  breadCrumbHeight: 48,
}

export const getMaxContainerHeight = (windowHeight: number) =>
  windowHeight - styles.topNavHeigh - styles.contentContainer.h1Height - 3 * styles.contentContainer.margin - 2 // 2px borders
