import axios from 'axios'

const state = () => {
  return {
    token: localStorage.getItem('token') || null,
    detailUsers: []
  }
}

const getters = {
  isLogin: (state) => {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  },
  getDetailUsers: (state) => {
    return state.detailUsers
  }
}

// const muttations = {
//   SET_DETAIL_USERS: (state, payload) => {
//     state.detailUsers = payload
//   }
// }

const actions = {
  login: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/login', {
        email: payload.email,
        password: payload.password
      }).then(response => {
        console.log(response)
        resolve(response.data.message)
        localStorage.setItem('token', response.data.tokenLogin)
        localStorage.setItem('image', response.data.image)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('refreshtoken', response.data.refreshtoken)
        localStorage.setItem('email', response.data.email)
      }).catch((err) => {
        reject(err, 'Login failed, password or email wrong!')
      })
    })
  },
  getDetailUser: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/getDetail/${payload}`).then(response => {
        context.commit('SET_DETAIL_USERS', response.data.data[0])
      }).catch(err => {
        reject(err)
      })
    })
  },
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/register/', payload)
        .then(response => {
          console.log(response)
          resolve(response.data.message)
        })
        .catch(() => {
          alert('Register failed')
        })
    })
  },
  // getall (context, payload) {
  //   return new Promise((resolve, reject) => {
  //    axios.get('http://localhost:3000/getall', payload).then(response => {
  //      resolve(response.data)
  //    })
  //   })
  // }
  logout (context) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshtoken')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  // muttations,
  actions
}
