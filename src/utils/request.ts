import axios from 'axios';


//请求拦截

axios.interceptors.request.use(config => {
  if (localStorage.blogFrontToken) {
    config.headers.Authorization = localStorage.blogFrontToken;
  }
  return config;
}, error => {
  return Promise.reject(error)
});


//响应拦截
axios.interceptors.response.use(response => {
  return response;
}, error => {
  const { status } = error.response;
  if (status === 401) {
    alert('tocken过期,请重新登陆')
    localStorage.removeItem("blogFrontToken")
    window.location.href = "http://localhost:3000/juejin/home"
  } else {
    alert("这里有错误：" + error.response.data);
  }

  return Promise.reject(error);
});

/* 请求方法 */
export function getRequest<T>(url: string, params = {}, config = {}): Promise<T> {
  return axios.get<T>(url, {
    params,
    ...config,
  }) as unknown as Promise<T>;
}

export function postRequest<T>(url: string, params = {}, config = {}): Promise<T> {
  return axios.post<T>(
    url,
    params,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    }
  ) as unknown as Promise<T>;
}

export function postFileRequest<T>(url: string, params = {}, config = {}): Promise<T> {
  return axios.post<T>(
    url,
    params,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    }
  ) as unknown as Promise<T>;
}

