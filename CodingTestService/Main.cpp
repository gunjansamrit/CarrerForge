#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char* argv[]) {
    int product = 1;
    for(int i = 1; i < argc; i++) {
        product *= atoi(argv[i]);
    }
    cout << product << endl;
    return 0;
}