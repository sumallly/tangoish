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
hrgn_n = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもや　ゆ　よらりるれろわをん　　'
ktkn_n = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤ　ユ　ヨラリルレロワヲン　　'
hrgn_s = 'ぁぃぅぇぉがぎぐげござじずぜぞだぢづでど　　っ　　ばびぶべぼぱぴぷぺぽゃ　ゅ　ょ　　　　　ー　　　　'
ktkn_s = 'ァィゥェォガギグゲゴザジズゼゾダヂヅデド　　ッ　　バビブベボパピプペポャ　ュ　ョ　　　　　ー　　　　'

hrgn_l = list(hrgn_n) + list(hrgn_s)
ktkn_l = list(ktkn_n) + list(ktkn_s)
base = {}

for i in range(len(hrgn_l)):
    base[hrgn_l[i]] = {'hrgn':hrgn_l[i], 'ktkn':ktkn_l[i], 'color':'00000000'}

import json
print(json.dumps(base, ensure_ascii=False))#, indent=4))
