export enum LoadingStatus {
  NOT_LOADED = 'not loaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

export type TLoadingStatus = LoadingStatus.ERROR | LoadingStatus.LOADED | LoadingStatus.LOADING | LoadingStatus.NOT_LOADED;