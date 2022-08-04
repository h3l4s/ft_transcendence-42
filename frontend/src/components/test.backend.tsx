import { useEffect, useState } from "react";

function TestBackend() {
	const [error, setError] = useState<{ message: string } | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [msg, setMsg] = useState("");

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		fetch("http://localhost:3000")
			.then(response => response.json())
			.then(
				(data) => {
					setIsLoaded(true);
					setMsg(data);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, [])

	if (error) {
		return <div>error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>loading...</div>;
	} else {
		return (
			<div>
				result: {msg}
			</div>
		);
	}
}

export default TestBackend;