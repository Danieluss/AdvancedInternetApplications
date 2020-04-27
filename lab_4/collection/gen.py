import lorem

print('name,description,rating,image')
for i in range(32):
    print('name{},{},{},img{}'.format(i + 1, lorem.paragraph(), i % 5 + 1, i % 5 + 1))
