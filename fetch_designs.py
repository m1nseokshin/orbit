import urllib.request
import json
import ssl
import os

token = os.getenv("FIGMA_TOKEN", "your_figma_token_here")
file_key = os.getenv("FIGMA_FILE_KEY", "WDw51LCbwpoxxKJfV6oLiG")
node_ids = "11:2672,11:2670,52:1600,11:2668,11:2666,36:262,11:2664,36:264,11:2662,16:964,11:2661,17:2,16:976,16:987,16:953"

url = f"https://api.figma.com/v1/files/{file_key}/nodes?ids={node_ids}"
req = urllib.request.Request(url)
req.add_header("Authorization", f"Bearer {token}")

context = ssl._create_unverified_context()

try:
    with urllib.request.urlopen(req, context=context) as response:
        data = json.loads(response.read().decode())
        nodes = data.get("nodes", {})
        for nid, nval in nodes.items():
            document = nval.get("document", {})
            print(f"ID: {nid} | Name: {document.get('name')} | Type: {document.get('type')}")
except Exception as e:
    print("Error:", e)
