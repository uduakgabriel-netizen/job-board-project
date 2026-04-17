import urllib.request
import re

urls = [
    "https://www.pinterest.com/pin/100557004175443964/",
    "https://www.pinterest.com/pin/142567144448578125/",
    "https://www.pinterest.com/pin/459296862017421571/",
    "https://www.pinterest.com/pin/126523070778799367/",
    "https://www.pinterest.com/pin/54043264274757284/",
    "https://www.pinterest.com/pin/76631631198654865/",
    "https://www.pinterest.com/pin/1477812370208394/",
    "https://www.pinterest.com/pin/110056784639104273/",
    "https://www.pinterest.com/pin/22869910604464089/"
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for i, url in enumerate(urls, 1):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            match = re.search(r'<meta property="og:image" name="og:image" content="(.*?)"', html)
            if match:
                print(f"Image {i}: {match.group(1)}")
            else:
                match2 = re.search(r'<meta property="og:image" content="(.*?)"', html)
                if match2:
                    print(f"Image {i}: {match2.group(1)}")
                else:
                    print(f"Image {i}: Not found in {url}")
    except Exception as e:
        print(f"Image {i}: Error {e}")
