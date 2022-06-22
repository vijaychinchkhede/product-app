import axios from "axios";
import config from '../config/app';

const productAPI={
	getAllProduct () {
    return new Promise((resolve, reject) => {
      axios.get('/getallproduct').then((response) => {
        resolve(response.data)
      }, (error) => {
        reject(error)
      })
    })
  },
}