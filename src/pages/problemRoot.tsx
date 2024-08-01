import {redirect} from "react-router-dom";
import {useEffect} from "react";

const PageRootProblem = () => {
	useEffect(() => {
		redirect('/');
	}, [])
	return (
		<span>잠시만 기다려주세요</span>
	)
}

export default PageRootProblem;
