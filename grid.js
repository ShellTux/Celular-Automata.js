function Grid(rows, cols) {
  this.grid = [];
  for (let i = 0; i < rows * cols; i++) this.grid.push(0);
  this.w = w;
  this.cols = cols;
  this.rows = rows;
  this.number = [];
  for (let i = 0; i < rows * cols; i++) this.number.push(0);
}

Grid.prototype.show = function() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "rgb(10,200,10)";
  for (let i1 = 0; i1 < this.grid.length; i1++) {
    let i = Math.floor(i1 / this.cols);
    let j = i1 % this.cols;
    if (this.grid[i1] == 1) ctx.fillRect(j * this.w, i * this.w, this.w, this.w);
    ctx.strokeRect(j * this.w, i * this.w, this.w, this.w);
    // ctx.save();
    // ctx.fillStyle = "red";
    // ctx.fillText(this.number[i1], j * this.w + this.w / 2, i * this.w + this.w / 2);
    // ctx.restore();
  }
};

Grid.prototype.detect = function(x, y) {
  for (let i1 = 0; i1 < this.grid.length; i1++) {
    let i = Math.floor(i1 / this.cols);
    let j = i1 % this.cols;
    let xg = j * this.w;
    let yg = i * this.w;
    if (checkWithin(x, xg, xg + this.w) && checkWithin(y, yg, yg + this.w)) return i1;
  }
};

Grid.prototype.interact = function() {
  for (let i1 = 0; i1 < this.grid.length; i1++) {
    let neighbI = 0;
    let i = Math.floor(i1 / this.cols);
    let j = i1 % this.cols;
    let sum = 0;
    // console.log(i, j);
    for (let h = -1; h <= 1; h++) {
      for (let v = -this.cols; v <= this.cols; v += this.cols) {
        neighbI = i1 + h + v;
        if (i1 == neighbI || this.grid[neighbI] == undefined) continue;
        let life = this.grid[neighbI];
        sum += life;
        // console.log(life);
      }
    }
    // if (sum > 0) console.log(i1, sum);
    this.number[i1] = sum;
  }
  this.newGen();
};

Grid.prototype.newGen = function() {
  for (let i = 0; i < this.grid.length; i++) {
    let life = this.grid[i];
    let neighNum = this.number[i];
    if (life == 1 && neighNum < 2) this.grid[i] = 0;
    if (life == 1 && neighNum > 3) this.grid[i] = 0;
    if (life == 0 && neighNum == 3) this.grid[i] = 1;
    if (life == 1 && (neighNum == 2 || neighNum == 3)) this.grid[i] = life;
  }
};
