import * as React from 'react';
import { Spin } from 'antd';
import './style.less';

export function PageLoading() {
  return <div className="m-page-loading">
    <Spin size="large" />
  </div>;
}
