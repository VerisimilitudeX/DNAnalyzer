#[allow(non_snake_case)]
extern crate bio;
use bio::io::fasta;
use bio::seq_analysis::gc;
use std::path::Path;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let file_name = &args[1];
    file_name.clone().insert_str(0, "./");
    let path = Path::new(&file_name);
    let reader = fasta::Reader::from_file(path).unwrap();

    let mut sum_gc_content = 0.0;
    let mut count: u16 = 0;

    for result in reader.records() {
        let record = result.unwrap();
        sum_gc_content += (gc::gc_content(record.seq())) as f64;
        count+=1;
    }

    let average_gc_content: f64 = (sum_gc_content as f64 / count as f64) * 100.0;
    println!("\nAverage GC content: {}%", average_gc_content);
}
