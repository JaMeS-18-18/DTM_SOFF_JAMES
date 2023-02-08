import  { BaseUrl2 } from './FetchData';

class Competition {
    async CompetitionRegister(data) {
        let endPoint = 'join';
        let response = await fetch(`${BaseUrl2}/${endPoint}/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
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

    async Competitionparticipants() {
        let endPoint = 'participant';
        let response = await fetch(`${BaseUrl2}/${endPoint}/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
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

    async Musobaqalar() {
        let endPoint = 'last-objs';
        let response = await fetch(`${BaseUrl2}/${endPoint}/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
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

export default new Competition();
