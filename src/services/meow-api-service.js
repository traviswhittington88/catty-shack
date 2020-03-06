import config from '../../../thoughtful-client/src/config'
import TokenService from './token-service'

const EntryApiService = {
    getEntries() {
      return fetch(`${config.API_ENDPOINT}/entries`, {
        headers: {
            'authorization': `bearer ${TokenService.getAuthToken() }`,
        },
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(error => Promise.reject(error))
            : res.json()
        )
    },
    getEntry(entryId) {
      return fetch(`${config.API_ENDPOINT}/entries/${entryId}`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then(res => 
          (!res.ok) 
            ? res.json().then(error => Promise.reject(error))
            : res.json()
        )
    },
    postEntry(entryId, text) {
      return fetch(`${config.API_ENDPOINT}/entries`, {
        method: 'POST',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          entry_id: entryId,
          text,
        }),
      })
        .then(res => 
          (!res.ok)
            ? res.json().then(error => Promise.reject(error))
            : res.json()    
        )
    }
}

export default EntryApiService