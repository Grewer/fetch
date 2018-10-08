interface IParams {
  [key: string]: string | number
}


interface IConfig {
  baseUrl: string
  timeout: number
  headers: {
    [key: string]: any
  }
  transformRequest: () => IParams
  responseType: string
  withCredentials: boolean
}

interface IResult {
  data: any
  xhr: XMLHttpRequest
  params?: IParams
  url: string
  config: IConfig
}

type IFFetch = (url: string, params?: IParams, config?: IConfig) => Promise<IResult>

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