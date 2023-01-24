import { BaseUrl } from './FetchData';

class SendRasm {
    async SendImage(data, token, nomer) {
        console.log(token);

        let endPoint = 'profile';
        let response = await fetch(`${BaseUrl}/${endPoint}/${nomer}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'multipart/form-data',
                 'Authorization': 'Bearer ' + token,
              },
              body: data,
        })
            .then(ress => {
                return ress.json();
            })
            .then(json => {
                return json;
            })
            .catch(err => {
                return err;
            });

        return response;
    }
}

export default new SendRasm();
