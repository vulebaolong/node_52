const {data} = pm.response.json()
console.log(data)
pm.globals.set("accessToken", data.accessToken)
pm.globals.set("refreshToken", data.refreshToken)