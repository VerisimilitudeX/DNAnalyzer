#[allow(non_snake_case)]
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
    let mut count = 0;
    for result in reader.records() {
        let record = result.unwrap();
        let gc_content = gc::gc_content(record.seq());
        count += 1;
        if count == 10 {
            println!("\nGC content: {}", gc_content);
            count = 0;
        }
        gc_contents.push(gc_content);
    }

    let average_gc_content = calculate_average(&gc_contents);
    println!("\nAverage GC content: {}%", average_gc_content);
}

fn calculate_average(values: &[f32]) -> f64 {
    let sum: f32 = values.iter().sum();
    let count = values.len() as f32;
    (round((sum / count).into(), 5)) * 100.0
}
