import os
import shutil

os.chdir('./openapi_files')
folder_path = './database_api_client'
shutil.rmtree(folder_path,ignore_errors=True)
