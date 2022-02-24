const r = () => new Promise(
  (res) => {
    console.log('send Request')
    setTimeout(() => {
      res('success')
    }, 2000)
  }
)

class req {
  static req() {
    if (this.loading) {
      return this.request
    }
    this.loading = true
    const that = this
    this.request = new Promise((res) => {
      r().then((data) => {
        res(data)
        that.loading = false
      })
    })
    return this.request
  }
}

export default req