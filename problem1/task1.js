var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  if (n == 1) {
    return 1;
  } else {
    return n + sum_to_n_b(n - 1);
  }
};

var sum_to_n_c = function (n) {
  let i = 1;
  let sum = 0;
  do {
    sum += i;
    i++;
  } while (i <= n);
  return sum;
};
