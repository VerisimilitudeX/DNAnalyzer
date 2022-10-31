FASTA Compressed File Format (.fac)
---

The FASTA File format (.fa), currently maintained by the NIH, is---in it's current form---extremely computationally and memory inefficient. Encoded in UTF-8, each nucleotide takes up ~1 byte, even though there are only 16 possible nucleotides. This is why I propose an alternative to storing nucleotide sequences.

## Header
The *FASTA Compressed* file format version 1 begins with a variable-length header. A question mark (?) denotes an optional parameter.

| Length  | Data                                                           |
|---------|----------------------------------------------------------------|
| 8 bits  | File format version number                                     |
| String? | ASCII string of nucleotide sequence name + additional metadata |

After the header, the actual nucleotide sequence is included.

## Nucleotide Sequence

The nucleotide sequence can be represented as an array of 4-bit integers, with the value of the integers corresponding to the following nucleotides:

| Integer | FASTA Equivalent | Definition            |
|---------|------------------|-----------------------|
| 0       | A                | A                     |
| 1       | C                | C                     |
| 2       | G                | G                     |
| 3       | T (or U)         | T (or U)              |
| 4       | R                | A or G                |
| 5       | Y                | C, T or U             |
| 6       | K                | G, T or U             |
| 7       | M                | A or C                |
| 8       | S                | C or G                |
| 9       | W                | A, T or U             |
| 10      | B                | Not A                 |
| 11      | D                | Not C                 |
| 12      | H                | Not G                 |
| 13      | V                | Not T (or U)          |
| 14      | N                | A, C, G, T, or U      |
| 15      | -                | Gap of unknown length |

