from pathlib import Path

MAX_BYTES = 100 * 1024 * 1024
CSV_PATHS = [
    Path("data/Global Locations_2026_06_18_23_57_11 (1).csv"),
    Path("data/hotel 1_2026_06_18_23_57_11 (1).csv"),
]

if __name__ == "__main__":
    for path in CSV_PATHS:
        if not path.exists():
            print(f"SKIP: {path} not found")
            continue

        print(f"Splitting: {path}")
        with path.open("rb") as src:
            header = src.readline()
            if not header:
                print(f"SKIP: {path} is empty")
                continue

            part_index = 1
            out_path = path.parent / f"{path.stem}.part{part_index}{path.suffix}"
            out_file = out_path.open("wb")
            out_file.write(header)
            current_size = len(header)

            for line in src:
                if current_size + len(line) > MAX_BYTES:
                    out_file.close()
                    part_index += 1
                    out_path = path.parent / f"{path.stem}.part{part_index}{path.suffix}"
                    out_file = out_path.open("wb")
                    out_file.write(header)
                    current_size = len(header)

                out_file.write(line)
                current_size += len(line)

            out_file.close()
            print(f"Created {part_index} parts for {path.name}")
