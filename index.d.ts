interface IParams {
  [key: string]: string | number | any[]
}

type EventHandle = (target: EventTarget,
                    type: string,
                    bubbles: boolean,
                    cancelable: boolean,
                    lengthComputable: boolean) => void


export interface IConfig {
  baseUrl?: string
  timeout?: number
  headers?: {
    [key: string]: any
  }
  transformRequest?: (IParams) => IParams
  responseType?: string
  withCredentials?: boolean
  upload?: Partial<Record<'onloadstart' | 'onprogress' | 'onabort' | 'onerror' | 'onload' | 'ontimeout' | 'onloadend', EventHandle>>
}

export interface IResult {
  data: any
  xhr: XMLHttpRequest
  params?: IParams
  url: string
  config: IConfig
}

export type IFFetch = (url: string, params?: IParams, config?: IConfig) => Promise<IResult>

declare namespace fetch {
  const get: IFFetch
  const post: IFFetch
  const del: IFFetch
  const put: IFFetch
  const config: IConfig
  const interceptor: {
    success: (data: any) => Promise<any>
    fail: (data: any) => Promise<any>
  }
}


export default fetch
