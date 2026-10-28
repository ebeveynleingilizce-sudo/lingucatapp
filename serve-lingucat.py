from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import webbrowser, threading
ROOT=Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
    extensions_map={**SimpleHTTPRequestHandler.extensions_map,'.wasm':'application/wasm','.pck':'application/octet-stream','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav','.mp4':'video/mp4','.webmanifest':'application/manifest+json','.js':'text/javascript'}
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
    def end_headers(self):
        self.send_header('Cache-Control','no-cache')
        self.send_header('X-LinguCat-App','1')
        if Path(self.path.split('?')[0]).suffix.lower() in ('.mp3','.ogg','.wav','.mp4'):
            self.send_header('Content-Disposition','inline')
        super().end_headers()
    def list_directory(self,path):
        self.send_error(404,'Directory listing disabled')
        return None

def main():
    address=('127.0.0.1',8765)
    try:server=ThreadingHTTPServer(address,Handler)
    except OSError:
        import urllib.request
        try:
            with urllib.request.urlopen('http://127.0.0.1:8765/index.html',timeout=2) as response:
                if response.headers.get('X-LinguCat-App')!='1' or b'LinguCat' not in response.read(65536):raise OSError('Farkli uygulama')
            webbrowser.open('http://127.0.0.1:8765/index.html');raise SystemExit(0)
        except OSError:
            print('8765 portu baska uygulama tarafindan kullaniliyor.');raise SystemExit(1)
    print('LinguCat: http://127.0.0.1:8765/ — Kapatmak icin bu pencereyi kapatin.')
    threading.Timer(.5,lambda:webbrowser.open('http://127.0.0.1:8765/index.html')).start()
    try:server.serve_forever()
    except KeyboardInterrupt:pass
    finally:server.server_close()

if __name__=='__main__':
    main()
