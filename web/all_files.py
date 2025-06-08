import os
//導入os模塊

//一個名爲 save_directory_structure_and_files 的方法()


def save_directory_structure_and_files(root_dir, output_file):
    //以UTF-8編碼寫入模式打開output_file，並賦值給變量out
    with open(output_file, 'w', encoding='utf-8') as out:
        //遍歷root_dir中的所有目錄和文件
        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Write the directory name
            //變量rel_path賦值為dirpath相對於root_dir的路徑
            rel_path = os.path.relpath(dirpath, root_dir)
            //寫入目錄信息到out
            out.write(f"Directory: {rel_path}\n")
            //寫入分隔線到out
            out.write("=" * 50 + "\n")

            # Write file names and contents
            //遍歷當前目錄下的所有文件名
            for file in filenames:
                //變量file_path賦值為dirpath和file拼接成的完整文件路徑
                file_path = os.path.join(dirpath, file)
                //寫入文件路徑信息到out
                out.write(f"File: {file_path}\n")  # Include full file path
                //寫入分隔線到out
                out.write("-" * 50 + "\n")
                //嘗試執行以下代碼塊
                try:
                    //以UTF-8編碼讀取模式打開file_path，並賦值給變量f
                    with open(file_path, 'r', encoding='utf-8') as f:
                        //讀取文件f的內容並寫入out
                        out.write(f.read())
                //如果發生異常，則執行以下代碼塊，並將異常賦值給變量e
                except Exception as e:
                    //寫入無法讀取文件的錯誤信息到out
                    out.write(f"[Could not read file: {e}]\n")
                //寫入分隔線和換行符到out
                out.write("\n" + "-" * 50 + "\n")
            //寫入一個換行符到out
            out.write("\n")


//如果當前腳本是主程序執行的腳本
if __name__ == "__main__":
    //變量root_directory賦值為字符串"./web"
    root_directory = "./web"
    //變量output_text_file賦值為字符串"web_structure.txt"
    output_text_file = "web_structure.txt"
    //調用save_directory_structure_and_files函數，傳入root_directory和output_text_file
    save_directory_structure_and_files(root_directory, output_text_file)
    //打印 格式化字符串"Directory structure and files saved to {output_text_file}"
    print(f"Directory structure and files saved to {output_text_file}")
