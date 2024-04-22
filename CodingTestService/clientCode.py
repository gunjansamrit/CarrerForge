import sys

if __name__ == "__main__":
    args = sys.argv[1:]
    arr = list(map(int, args))
    sum = sum(arr)
    print(sum)