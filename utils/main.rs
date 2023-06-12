extern crate bio;
use bio::io::fasta;
use bio::seq_analysis::gc;
use std::path::Path;
use std::env;
use round::round;

fn main() {
    let args: Vec<String> = env::args().collect();
    let file_name = &args[1];
    file_name.clone().insert_str(0, "./");
    let path = Path::new(&file_name);
    let reader = fasta::Reader::from_file(path).unwrap();
    let mut gc_contents = Vec::new();

    for result in reader.records() {
        let record = result.unwrap();
        let gc_content = gc::gc_content(record.seq());
        println!("GC content: {}", gc_content);
        gc_contents.push(gc_content);
    }

    let average_gc_content = calculate_average(&gc_contents);
    println!("Average GC content: {}%", average_gc_content);
}

fn calculate_average(values: &[f32]) -> f64 {
    let sum: f32 = values.iter().sum();
    let count = values.len() as f32;
    (round((sum / count).into(), 5)) * 100.0
}
