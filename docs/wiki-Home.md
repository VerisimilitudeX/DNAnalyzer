Welcome to the DNAnalyzer wiki!

![](https://user-images.githubusercontent.com/96280466/186224441-46dd2029-b9dc-4b3d-aad8-bfd1e1e62f2e.png)

> DNAnalyzer identifies proteins, amino acids, start and stop codons, high coverage regions, regions susceptible to neurodevelopment disorders, transcription factors, and regulatory elements. Researchers are working to extract valuable information from such software to better understand human health and disease. Currently, we are working on developing a Command-Line-Interface (CLI) and Graphical User Interface (GUI) that will enable physicians to quickly and more easily interact with the software, enabling them to identify genetic mutations that may cause disease.

# [Documents](https://github.com/Verisimilitude11/DNAnalyzer/tree/main/docs)

## Contributing

### Steps to follow 📜

#### 1. Fork it 🍴

You can get your own fork (copy) of [DNAnalyzer](https://github.com/Verisimilitude11/DNAnalyzer) by using the `Fork`
button at the top right of this page.

![Fork Button](https://github-images.s3.amazonaws.com/help/bootcamp/Bootcamp-Fork.png)

#### 2. Clone it 👥

You must move to your fork of the repository and clone (download) it to your local machine using

`$ git clone https://github.com/Your_Username/DNAnalyzer.git`

This creates a local copy of the repository on your machine.

After cloning the `DNAnalyzer` repository on Github, use the change directory command on Linux and Mac to go to that
folder.

```python
# This will change directory to a folder DNAnalyzer                                                                   
$ cd
DNAnalyzer
```

Move to this folder for all other commands.

Let us now add a reference to the original 'DNAnalyzer' repository using:

`$ git remote add upstream https://github.com/theabhishek07/DNAnalyzer.git`

This adds a new remote named **_upstream_**.

Examine the modifications using:

```git
 $ git remote -v
 origin https://github.com/Your_Username/DNAnalyzer.git (fetch)                                                      
 origin https://github.com/Your_Username/DNAnalyzer.git (push)                                                        
 upstream https://github.com/theabhishek07/DNAnalyzer.git (fetch)                                                     
 upstream https://github.com/theabhishek07/DNAnalyzer.git (push)
 ```

#### 3. Sync with the Remote 🔄

Remember to keep your local repository up to date with the remote repository.

```python
# Fetch all remote repositories and delete any deleted remote branches
$ git
fetch - -all - -prune
# Switch to main branch
$ git
checkout
main
# Reset local main branch to match upstream repository's main branch
$ git
reset - -hard
upstream / main
# Push changes to your forked DNAnalyzer repo
$ git
push
origin
main
```

#### 4. Create a new branch

Whenever you want to make a contribution, use the following command to establish a new branch and keep your `main`
branch uncluttered (i.e. synced with remote branch).

```python
# It will create a new branch <branchname> with name and switch to branch <branchname>
$ git
checkout - b < branchname >
```

To switch to desired branch

```python
# To switch from one folder to other
$ git
checkout < branchname >
```

To add the changes to the branch. Use

```python
# To add all files to branch
$ git
add.
```

Type in a message relevant for the code reveiwer using

```python
# This message get associated with all files you have changed
$ git
commit - m
"relevant message"
```

Now, Push your awesome work to your remote repository using

```python
# To push your work to your remote repository
$ git
push - u
origin < branchname >
```

Finally, in your browser, navigate to your repository and click `Contribute` amd then `Open Pull Request`. There, please
provide a title and description, with brevity, that describe your much-appreciated effort.

## Contribution Guideline

- Drop a :star: on the Github repository (It's optional)<br/>

- Before Contribute Please
  read `Contributing_Guidelines.md`
  and `CODE_OF_CONDUCT.md`

- Create an issue of the project or a feature you would like to add in the project and get the task assigned for
  youself.(Issue can be any bug fixes or any feature you want to add in this project).

- Fork the repo to your Github.<br/>

- Clone the Repo by going to your local Git Client in a particular local folder in your local machine by using this
  command with your forked repository link in place of below given link: <br/>
  `git clone https://github.com/Verisimilitude11/DNAnalyzer`
- Create a branch using below command.
  `git branch <your branch name>`
- Checkout to your branch.
  `git checkout <your branch name>`
- Add your code in your local machine folder.
  `git add . `
- Commit your changes.
  `git commit -m"<add your message here>"`
- Push your changes.
  `git push --set-upstream origin <your branch name>`

- Make a pull request! (compare your branch with the owner main branch)

## Usage

#### Command-Line Interface (CLI) Usage

DNAnalyzer uses CLI arguments instead of `stdin`. For example, you can do:

```
<executable> assets/dna/random/dnalong.fa --amino=ser
```

or

```
<executable> assets/dna/random/dnalong.fa --amino=ser --min=0 --max=100
```

Help message (--help):

```
Usage: DNAnalyzer [-hrV] --amino=<aminoAcid> [--find=<proteinFile>]
                  [--max=<maxCount>] [--min=<minCount>] DNA
A program to analyze DNA sequences.
      DNA                    The FASTA file to be analyzed.
      --amino=<aminoAcid>    The amino acid representing the start of a gene.
      --find=<proteinFile>   The DNA sequence to be found within the FASTA file.
  -h, --help                 Show this help message and exit.
      --max=<maxCount>       The maximum count of the reading frame.
      --min=<minCount>       The minimum count of the reading frame.
  -r, --reverse              Reverse the DNA sequence before processing.
  -V, --version              Print version information and exit.
  ```
## Reports

[Key Personnel and Knowledge Distribution](https://github.com/Verisimilitude11/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/reports/key-personnel-and-and-knowledge-distribution.pdf)

[Technical Health Overview](https://github.com/Verisimilitude11/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/reports/technical-health-overview.pdf)

[Trend Report](https://github.com/Verisimilitude11/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/reports/trend-report.pdf)

## Samples

[Serine DNAlong](https://github.com/Verisimilitude11/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/samples/serine-dnalong.md)