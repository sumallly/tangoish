print('あ')
print('あ'.encode('utf-8'))
print('あ'.encode('utf-8').hex())
print(int('あ'.encode('utf-8').hex(), 16))
print(int('あ'.encode('utf-8').hex(), 16)+1)
print(hex(int('あ'.encode('utf-8').hex(), 16)+1)[2:])
print(bytes.fromhex(hex(int('あ'.encode('utf-8').hex(), 16)+1)[2:]))
print(bytes.fromhex(hex(int('あ'.encode('utf-8').hex(), 16)+1)[2:]).decode('utf-8'))

for i in range(100):
    print(bytes.fromhex(hex(int('あ'.encode('utf-8').hex(), 16)+i)[2:]).decode('utf-8'))