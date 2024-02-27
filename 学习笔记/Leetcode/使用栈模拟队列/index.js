class MyQueue {
  arr = []
  arrTemp = []

  // void push(int x) 将元素 x 推到队列的末尾
  push() {
    this.arr.push(x)
  }

  // int pop() 从队列的开头移除并返回元素
  pop() {
    if (this.arrTemp.length) return this.arrTemp.pop()
    while(this.arr.length) {
      this.arrTemp.push(this.arr.pop())
    }
    return this.arrTemp.pop()
  }

  // int peek() 返回队列开头的元素
  peek() {
    if (this.arrTemp.length) return this.arrTemp[this.arrTemp.length - 1]
    while(this.arr.length) {
      this.arrTemp.push(this.arr.pop())
    }
    return this.arrTemp[this.arrTemp.length - 1]
  }

  // boolean empty() 如果队列为空，返回 true ；否则，返回 false
  empty() {
    return this.arr.length === 0 && this.arrTemp.length === 0
  }
}
