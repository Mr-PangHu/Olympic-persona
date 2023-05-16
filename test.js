// let s = 'get_element_by_id'
// let reg = /([^_])(?:_([^_]))/g
// console.log(s.match(reg))
// s = s.replace(reg,($0,$1,$2) => $1+$2.toUpperCase())
// console.log(s);

// function hyphenToCamelCase(str) {
//     return str.replace(/-([a-z])/g, function(match, group1) {
//       return group1.toUpperCase();
//     });
//   }
// console.log(hyphenToCamelCase("font-s-z"))

// function hyphenToCamelCase(str) {
//     return str.replace(/_([a-z])/g, function(match, group1) {
//       return group1.toUpperCase();
//     });
//   }
// console.log(hyphenToCamelCase("get_element_by_id"))

// function debounce(fn,delay) {
//   let timer = null
//   return function() {
//     let _this = this
//     let args = arguments
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(_this,args)
//     }, delay);
//   }
// }

// function throttle(fn,delay) {
//   let last = 0
//   let _this = this
//   let args = arguments
//   let now = new Date()
//   if (now - (last > delay) {
//     fn.apply(_this,args)
//     last = now
//   }
// }

// var long = function(s) {
//   let res = 0
//   let str = ''
//   for (var i = 0; i < s.length; i++) {
//     let ch = s[i]
//     let index = str.indexOf(ch)
//     if (index == -1) {
//       str += ch
//       res = Math.max(str.length,res) 
//     } else {
//       str = ch
//     }
//   }
//   return res
// }

// console.log(long('acdd'))


// var trim = function (s) {
//   return s.replace(/\s*/g,'')
// }
// console.log(trim(' we wr '))

// function sleep(time) {
//   return new Promise(resolve => setTimeout(resolve, time))
// }
// t1 = new Date()
// sleep(3000).then(()=> console.log(new Date() - t1))

// function bian(arr) {
//   while (arr.some(item => Array.isArray(item))){
//     arr = [].concat(...arr)
//   }
//   return arr
// }

// console.log(bian([1,[2],[3,[4]]]))

// var nums = [-1,0,1,-1,2,3]
// nums.sort((a,b) => a-b)
// let res =[]
// for (var i = 0; i < nums.length; i++){
//   if (i > 0 && nums[i] == nums[i-1]) {
//     continue
//   }
//   if (nums[i] > 0) {
//     break
//   }
//   let l = i+1
//   let r = nums.length-1
//   while (l < r) {
//     if (nums[i] + nums[l] + nums[r] == 0) {
//       res.push([nums[i],nums[l],nums[r]])
//       while (l < r && nums[l] == nums[l+1]) l++
//       while (l < r && nums[r] == nums[r-1]) r--
//       l++
//       r--
//     } else if (nums[i] + nums[l] + nums[r] < 0) {
//       l++
//     } else {
//       r--
//     }
//   }
// }
// console.log(res)

// var arr1 = [1,2,3,4]
// var arr2 = [3,4,5,6]
// console.log(arr1.filter(item => arr2.includes(item)))
// console.log(arr1.filter(item => !arr2.includes(item)))
// console.log(Array.from(new Set([...arr1,...arr2])))
// console.log(arr1.filter(item => !arr2.includes(item)).concat(arr2.filter(item => !arr1.includes(item))))

// var color = '#ffffff'
// var regex = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
// match = color.match(regex) 
// console.log(parseInt(match[1],16))

// var arr = [1,2,3,3,4,5]
// var res =[]
// for (var i = 0; i < arr.length; i++) {
//   if (arr.indexOf(arr[i]) == i) {
//     res.push(arr[i])
//   }
// }

// arr.sort()
// for (var i = 0; i < arr.length; i++) {
//   for (var j = i + 1; j < arr.length; j++) {
//     if (arr[i] == arr[j]) {
//       i++
//       j = i
//     }
//   }
//   res.push(arr[i])
// }

// res = Array.from(new Set(arr))
// console.log(res)

// console.log(Math.floor(1.8))

// function QuickSort(arr) {
//   if (arr.length <= 1) {
//     return arr
//   }
//   let pivot = arr[0]
//   let left = []
//   let right = []
//   for (var i = 1; i < arr.length; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i])
//     } else {
//       right.push(arr[i])
//     }
//   }
//   return [...QuickSort(left),pivot,...QuickSort(right)]
// }
// console.log(QuickSort([2,3,1,5,7,4,2]))

// function debounce(fn,delay) {
//   let timer = null
//   return function () {
//     let _this = this
//     let args = arguments
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(_this,args)
//     },delay)
//   }
// }

// function throttle (fn, delay) {
//   let last = 0
//   return function () {
//     let _this = this
//     let args = arguments
//     let now = new Date()
//     if (now - last > delay) {
//       fn.apply(_this,args)
//       last = now
//     }
//   }
// }


