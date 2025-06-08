from random import choice
//從random模塊導入choice方法

//變量__summary__賦值為字符串"Generate a random DNA file that is 100MB"
__summary__ = "Generate a random DNA file that is 100MB"
//變量__author__賦值為字符串"@Nv7-GitHub (Nishant Vikramaditya)"
__author__ = "@Nv7-GitHub (Nishant Vikramaditya)"
//變量__version__賦值為字符串"2.0.1"
__version__ = "2.0.1"

//變量SIZE賦值為100000000
SIZE = 100000000
//變量codes賦值為列表["a", "t", "g", "c"]
codes = ["a", "t", "g", "c"]
//變量txt賦值為空字符串""
txt = ""
//循環SIZE次
for _ in range(0, SIZE):
    //將codes列表中的隨機元素追加到txt字符串
    txt += choice(codes)

//以寫入和更新模式打開文件"files/dna/dnalong.fa"，並將其賦值給變量f
with open("files/dna/dnalong.fa", "w+") as f:
    //將txt字符串的內容寫入文件f
    f.write(txt)

//打印 字符串"Done."
print("Done.")
