import * as React from 'react';
import Loadable from 'react-loadable';
import {LoadingComponentProps} from 'react-loadable';
import {PageLoading} from 'components/Loading';

function Loading(props: LoadingComponentProps) {
	if (props.error) {
		return <h1>"Error! Component failed to load"</h1>;
	} else {
		return <PageLoading />;
	}
}

const LoadableComponent = (component: any) => Loadable({
	loader: component,
	loading: Loading,
});

export default LoadableComponent;