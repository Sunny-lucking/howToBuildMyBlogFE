import * as React from 'react';
import { Button, Result } from "antd";

export default function Exception404() {
	return <Result status="404"
		title="404"
		style={{ height: '100%' }}
		subTitle="访问页面不存在" />
}

