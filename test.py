# str = 'LOGNAME=default;SHELL=/bin/bash;HOME=/home/xiaomei;LOGNAME=xiaomei;'
# arr = str.split(';')
# arr.pop()
# dic = dict()
# for s in arr:
#     sarr = s.split('=')
#     dic[sarr[0]] = sarr[1]
# query = ['SHELL','HOME','LOGNAME','logname']
# for q in query:
#     if q in dic:
#         print(dic[q])
#     else:
#         print('EMPTY')

# n = 6
# mei = [3,1,2,7,9,6]
# dp = [0]*n
# dp[0] = mei[0]
# dp[1] = max(mei[0],mei[1])
# dp[2] = max(mei[0],mei[1],mei[2])
# for i in range(3,n):
#     dp[i] = max(dp[i-3]+mei[i],dp[i-1])
# print(max(dp))

# n = 7
# k = 1
# a = [1,5,6,2,7,4,3]
# dp = [[0] * (k+1) for _ in range(n)]
# dp[0][0] = a[0]
# dp[0][1] = a[0]
# dp[1][0] = max(a[0],a[1])
# dp[1][1] = a[0]+a[1]
# for i in range(2,n):
#     dp[i][0] = max(dp[i-1][0],dp[i-2][0]+a[i])
#     for j in range(1,k+1):
#         dp[i][j] = dp[i-1][j-1] + a[i]
#         dp[i][j] = max(dp[i][j],dp[i-1][j])
#         dp[i][j] = max(dp[i][j],dp[i-2][j]+a[i])
# print(dp[n-1][k])


# from scipy.special import comb, perm
# n = 4
# k = 2
# a = [2,3,4,8]
# if k in a:
#     a.pop(a.index(k))
#     bishan = 0
#     bubishan = 0
#     for i in a:
#         if i % k != 0:
#             bishan += 1
#         else:
#             bubishan += 1
#     res = 2
#     for i in range(1,bubishan):
#         res += comb(bubishan,i)
#     print(int(res))
# else:
#     print(0)


# n = 3
# strs = ['ab','ca','ccb']
# se = []
# res = 0
# def dfs(index,tar):
#     if index == tar:
#         res += 1
#         return
#     s = strs[index]
#     for i in range(len(s)):
#         if se.index(s[i]) == -1:
#             continue
#         else:
#             se.push(s[i])
#             dfs(index+1,tar)
#             se.pop(s[i])
# dfs(0,n)
# print(res)

# M = 10000
# n = 7
# prices = [1.0, 2.0, 1.0, 2.0, 2.0, 3.0, 2.0]
# K = 2
# dp = [[0] * n for _ in range(K+1)]
# for i in range(1,K+1):
#     maxdiff = -prices[0]
#     for j in range(1,n):
#         dp[i][j] = max(dp[i][j-1],maxdiff+prices[j])
#         maxdiff = max(maxdiff,dp[i-1][j-1]-prices[j])
# print(dp)

# n = 5
# m = 3
# a = [9,2,3,4,1]
# b = [
#     [1,4],
#     [2,3],
#     [4,5]
# ]

# b_sorted = sorted(b, key=lambda x: x[0])  
# res = []
# for i in range(m):
#     if b_sorted[i][1] > n: continue
#     tmp = sum(a[b_sorted[i][0]-1 : b_sorted[i][1]])
#     for j in range(i+1,m):
#         if b_sorted[j][1] > n: continue
#         if b_sorted[j][0] > b_sorted[i][1]:
#             tmp += sum(a[b_sorted[j][0]-1 : b_sorted[j][1]])
#         else:
#             continue
#     res.append(tmp)
# print(max(res))

