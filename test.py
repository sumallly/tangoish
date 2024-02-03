'''
print('あ')
print('あ'.encode('utf-8'))
print('あ'.encode('utf-8').hex())
print(int('あ'.encode('utf-8').hex(), 16))
print(int('あ'.encode('utf-8').hex(), 16)+1)
print(hex(int('あ'.encode('utf-8').hex(), 16)+1)[2:])
print(bytes.fromhex(hex(int('あ'.encode('utf-8').hex(), 16)+1)[2:]))
print(bytes.fromhex(hex(int('あ'.encode('utf-8').hex(), 16)+1)[2:]).decode('utf-8'))
print('----------------------------------------')
for i in range(100):
    print(bytes.fromhex(hex(int('ぁ'.encode('utf-8').hex(), 16)+i)[2:]).decode('utf-8'))
'''
import json
hrgn_n = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもや　ゆ　よらりるれろわをん　　'
ktkn_n = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤ　ユ　ヨラリルレロワヲン　　'
hrgn_s = 'ぁぃぅぇぉがぎぐげござじずぜぞだぢづでど　　っ　　ばびぶべぼぱぴぷぺぽゃ　ゅ　ょ　　　　　ー　　　　'
ktkn_s = 'ァィゥェォガギグゲゴザジズゼゾダヂヅデド　　ッ　　バビブベボパピプペポャ　ュ　ョ　　　　　ー　　　　'

hrgn_l = list(hrgn_n) + list(hrgn_s)
ktkn_l = list(ktkn_n) + list(ktkn_s)
base = {}

for i in range(len(hrgn_l)):
    base[hrgn_l[i]] = {'hrgn':hrgn_l[i], 'ktkn':ktkn_l[i], 'color':'y'}

print(json.dumps(base, ensure_ascii=False))#, indent=4))

'''
hrgn_n_l = list(hrgn_n)
hrgn_s_l = list(hrgn_s)
l = []
for i in range(5):
    l.append([])
    for j in range(10):
        l[i].append(hrgn_n_l[(9-j)*5+i])
for i in range(5,10):
    l.append([])
    for j in range(10):
        l[i].append(hrgn_s_l[(9-j)*5+i-5])
print(json.dumps(l, ensure_ascii=False))
'''
