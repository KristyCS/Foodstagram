import os

entries = os.listdir('Food pics')
img_urls = ['https://foodstagramdev.s3.amazonaws.com/Food+pics/'+ img_name \
    for img_name in entries] 

print(img_urls)
