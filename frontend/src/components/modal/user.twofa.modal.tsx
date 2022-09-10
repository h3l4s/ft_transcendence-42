
// async function googleAuthQr(){
// 	const options = {
// 		method: 'GET',
// 		url: 'https://google-authenticator.p.rapidapi.com/new_v2/',
// 		headers: {
// 		  'X-RapidAPI-Key': '6601bbc4a9mshd286de52b6adde8p1d960ejsnf414e828fa2a',
// 		  'X-RapidAPI-Host': 'google-authenticator.p.rapidapi.com'
// 		}
// 	  };

// 	  axios.request(options).then(function (response) {
// 		  console.log(response.data);
// 		  secret = response.data;
// 		  const options = {
// 			method: 'GET',
// 			url: 'https://google-authenticator.p.rapidapi.com/enroll/',
// 			params: {secret: response.data, issuer: 'ft_transcendance', account: 'admin'},
// 			headers: {
// 			  'X-RapidAPI-Key': '6601bbc4a9mshd286de52b6adde8p1d960ejsnf414e828fa2a',
// 			  'X-RapidAPI-Host': 'google-authenticator.p.rapidapi.com'
// 			}
// 		  };

// 		  axios.request(options).then(function (response) {
// 			  window.open(response.data, '_blank');
// 		  }).catch(function (error) {
// 			  console.error(error);
// 		  });
// 	  }).catch(function (error) {
// 		  console.error(error);
// 	  });
// }

function TwoFAModal()
{
	return (
		<div className='modal--add--chan' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
			bonjour
		</div>
	);
}

export default TwoFAModal;
