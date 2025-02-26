import os


def save_directory_structure_and_files(root_dir, output_file):
    with open(output_file, 'w', encoding='utf-8') as out:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Write the directory name
            rel_path = os.path.relpath(dirpath, root_dir)
            out.write(f"Directory: {rel_path}\n")
            out.write("=" * 50 + "\n")

            # Write file names and contents
            for file in filenames:
                file_path = os.path.join(dirpath, file)
                out.write(f"File: {file_path}\n")  # Include full file path
                out.write("-" * 50 + "\n")
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        out.write(f.read())
                except Exception as e:
                    out.write(f"[Could not read file: {e}]\n")
                out.write("\n" + "-" * 50 + "\n")
            out.write("\n")


if __name__ == "__main__":
    root_directory = "./web"
    output_text_file = "web_structure.txt"
    save_directory_structure_and_files(root_directory, output_text_file)
    print(f"Directory structure and files saved to {output_text_file}")
