public class Main {
    public static void main(String[] args) {
        int[] arr = new int[args.length];
        for(int i = 0; i < args.length; i++) {
            arr[i] = Integer.parseInt(args[i]);
        }
        int sum = 0;
        for(int num : arr) {
            sum += num;
        }
        System.out.println(sum);
    }
}