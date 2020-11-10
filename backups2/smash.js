﻿<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
	<title>Smash</title>
</head>
<body>

	<canvas id="myCanvas" width="1280" height="720"></canvas>

	<script>


		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");

		class flameraindrop {

			constructor() {
				this.endxpos = Math.floor(Math.random() * 1100+100);
				this.endypos = Math.floor(Math.random() * 380+200);
				this.flamesleft = 5;
				this.xpos = this.endxpos;
				this.ypos = -20;
				this.stepswanted=60
				this.stepsneeded = (Math.abs(this.ypos - this.endypos)) / this.stepswanted;
				this.step = 0;
				this.movey = this.stepsneeded;
				this.movey = 10;
				this.size = [25, 30];
				this.scale = 0.1;
				this.timer = 0;
				this.graphicstimer = 0;
				this.player = 0;
				this.graphic = flamegraphics[0];
				this.rotation = Math.floor(Math.random() * 360);


			}

			draw() {

				this.timer++;
				this.graphicstimer++;


				if (this.ypos < this.endypos) {
					this.ypos += this.movey;
					this.step++;
					this.scale = 1 / (this.stepswanted / 4 - this.step / 4);
				}

				if (this.ypos >= this.endypos) {

					let p = new Audio("onfire.mp3");
					p.playbackRate = 1;
					p.currentTime = 0.2;
					p.volume = 0.2;
					p.play();

					flames.push(new flamegraphic(this.xpos+12, this.ypos));
					this.flamesleft--;
					if (this.flamesleft > 0) {
						this.reinit();
					}
				}

				

				if (this.graphicstimer == 0) {
					this.graphic = flamegraphics[0];
				}

				if (this.timer == 10) {
					this.timer = 0;
					this.graphic = flamegraphics[1];
					this.graphicstimer = -5;
				}

				
				ctx.drawImage(this.graphic, this.xpos, this.ypos, this.size[0], this.size[1]);


			}

			reinit() {
				this.endxpos = Math.floor(Math.random() * 1100 + 100);
				this.endypos = Math.floor(Math.random() * 380 + 200);
				this.xpos = this.endxpos;
				this.ypos = -20;
				this.stepswanted = 60
				this.stepsneeded = (Math.abs(this.ypos - this.endypos)) / this.stepswanted;
				this.step = 0;
				this.movey = this.stepsneeded;
				this.movey = 10;
				this.size = [25, 30];
				this.scale = 0.1;
				this.timer = 0;
				this.graphicstimer = 0;
				this.player = 0;
				this.graphic = flamegraphics[0];
				this.rotation = Math.floor(Math.random() * 360);


			}
		}


		class sprinkler {

			constructor(xpos, ypos) {
				this.xpos = xpos;
				this.ypos = ypos;
				this.shots = 72;
				this.timer = 0;
				this.graphicstimer = 0;
				this.player = 0;
				this.graphic = sprinklergraphics[0];
				this.rotation = Math.floor(Math.random() * 360);


			}

			draw() {


				this.rotation++

				if (this.rotation > 360) {
					this.rotation = 0;
				}

				this.timer++;
				this.graphicstimer++;

				if (this.graphicstimer == 0) {
					this.graphic = sprinklergraphics[0];
				}

				if (this.timer == 10) {
					this.timer = 0;
					this.graphic = sprinklergraphics[1];
					this.graphicstimer = -5;
					this.shots--;
					this.shoot();
				}

				let m = 100 / 2 * 0.84375;//32; //27


				ctx.translate(this.xpos + m, this.ypos + m);
				ctx.rotate((this.rotation-15) * Math.PI / 180);
				ctx.drawImage(this.graphic, -m, -m, 100, 100);
				ctx.rotate((this.rotation-15) * Math.PI / 180 * -1);
				ctx.translate(-this.xpos - m, -this.ypos - m);


			}


			shoot() {

				let g = this.rotation;
				let t = (g) * Math.PI / 180;



				if (g > 180 && g < 270) {
					bullet[0] = this.xpos - Math.sin(t) * 50;
					bullet[1] = this.ypos - Math.cos(t) * 50;
				}
				if (g > 270 && g < 360) {
					bullet[0] = this.xpos - Math.sin(t) * 50;
					bullet[1] = this.ypos + Math.cos(t) * 50;
				}
				if (g > 0 && g < 90) {
					bullet[0] = this.xpos + Math.sin(t) * 50;
					bullet[1] = this.ypos + Math.cos(t) * 50;
				}
				if (g > 90 && g < 180) {
					bullet[0] = this.xpos + Math.sin(t) * 50;
					bullet[1] = this.ypos - Math.cos(t) * 50;
				}

				bullet[2] = Math.cos(t) * 10;
				bullet[3] = Math.sin(t) * 10;


				bullets.push(new bulletshot(bullet[0], bullet[1], bullet[2], bullet[3], g, this.player, 5, 0, 0));


			}
		}

		class flamegraphic {

			constructor(xpos, ypos) {
				this.xpos = xpos;
				this.ypos = ypos;
				this.timer = 0;
				this.flametimer = 0;

				//let grd = bloodctx.createRadialGradient(this.xpos, this.ypos, 1, this.xpos, this.ypos, 15);
				//grd.addColorStop(0, "black");
				//grd.addColorStop(1, "grey");
				bloodctx.beginPath();
				bloodctx.arc(this.xpos, this.ypos, 7, 0, 2 * Math.PI);
				bloodctx.fillStyle = "black";
				bloodctx.fill();

			}

			draw() {

				/*
				let grd = ctx.createRadialGradient(this.xpos, this.ypos, 1, this.xpos, this.ypos, 15);
				if (Number.isInteger(this.flametimer / 4)) {
					grd.addColorStop(0, "orange");
					grd.addColorStop(1, "red");
				}
				else {
					grd.addColorStop(0, "red");
					grd.addColorStop(1, "orange");
				}
				*/
				//ctx.beginPath();
				//ctx.arc(this.xpos, this.ypos, 15, 0, 2 * Math.PI);
				//ctx.fillStyle = grd;
				//ctx.fill();

				if (Number.isInteger(this.flametimer / 3) || Number.isInteger(this.flametimer / 4)) {
					ctx.drawImage(flamegraphics[0], this.xpos - 12, this.ypos - 15, 25, 30);
				} else {
					ctx.drawImage(flamegraphics[1], this.xpos - 12, this.ypos - 15, 25, 30);
				}

				this.flametimer++;

				this.collide();

			}

			collide() {
				for (let x = 0; x < zombies.length; x++) {

					zombies[x].collidefire(this);

					

				}
			}
		}

		class explosiongraphic {

			constructor(xpos, ypos) {
				this.xpos = xpos;
				this.ypos = ypos;
				this.timer = 0;

				let grd = bloodctx.createRadialGradient(this.xpos, this.ypos, 1, this.xpos, this.ypos, 15);
				grd.addColorStop(0, "black");
				grd.addColorStop(1, "grey");
				bloodctx.beginPath();
				bloodctx.arc(this.xpos, this.ypos, 15, 0, 2 * Math.PI);
				bloodctx.fillStyle = grd;
				bloodctx.fill();

			}

			draw() {


				ctx.beginPath();
				ctx.arc(this.xpos, this.ypos, 75, 0, 2 * Math.PI);
				ctx.fillStyle = "red";
				ctx.fill();

			}
		}

		class bulletshot {


			//////xpos,ypos,xspeed,yspeed, rotation, player, [damage, speed,
			///// spreader, rotation+45, rotation-45

			constructor(xpos, ypos, xspeed, yspeed, rotation, player, power, rocket, type) {

				this.xpos = xpos;
				this.ypos = ypos;
				this.xspeed = xspeed;
				this.yspeed = yspeed;
				this.rotation = rotation;
				this.player = player;
				this.power = power;
				this.type = type;
				this.graphic = bulletgraphics[this.type];
				this.flametimer = 0;

				this.rocket = rocket;

				this.size = [5, 5];
				if (this.type == 6) {
					this.size = [32, 32];
				}

				if (this.type == 5 || this.type == 4) {
					this.size = [10, 10];
				}


				if (rocket == 1) {
					this.rockets = 3;
				}



				//var shot = new Audio("shot.wav");
				//shot.playbackRate = 2;
				//shot.volume = 0.1;
				if (this.type == 0 || this.type == 1 || this.type == 2) {
					shot[shotplaylist].play();
					shotplaylist++;
					if (shotplaylist == shot.length) {
						shotplaylist = 0;
					}
				}
				if (this.type == 3) {

					buckshotsound.currentTime = 0.2;
					buckshotsound.playbackRate = 1.5;
					buckshotsound.play();
				}
				if (this.type == 4) {

					let p = new Audio("lasershot.mp3");
					p.playbackRate = 1;
					//p.currentTime = 0;
					p.volume = 0.2;
					p.play();
				}
				if (this.type == 5) {

					

				}
				if (this.type == 6) {

					let p = new Audio("rocketshot.mp3");
					p.playbackRate = 0.8;
					p.currentTime = 0.2;
					p.volume = 0.5;
					p.play();

				}
				if (this.type == 7) {

					let p = new Audio("fireshot.mp3");
					p.playbackRate = 1;
					//p.currentTime = 0;
					p.volume = 0.2;
					p.play();

				}
				//console.log(this.rotation)

			}

			draw() {

				if (this.type == 7) {
					this.flametimer++
					//console.log(this.flametimer);
					if (this.flametimer > 39) {
						createflame.call(this);
					}
				}

				this.xpos += this.xspeed;
				this.ypos += this.yspeed;

				let m = this.size[0] / 2 * 0.84375;//32; //27


				ctx.translate(this.xpos + m, this.ypos + m);
				ctx.rotate(this.rotation * Math.PI / 180);
				ctx.drawImage(this.graphic, -m, -m, this.size[0], this.size[1]);
				ctx.rotate(this.rotation * Math.PI / 180 * -1);
				ctx.translate(-this.xpos - m, -this.ypos - m);

				//ctx.drawImage(this.graphic, this.xpos, this.ypos, this.size[0], this.size[1]);

			}

			rocketremove() {
				this.rockets--;
				if (this.rockets <= 0) {
					this.rocketexplode();
					return true;
				}
			}

			rocketexplode() {

				explosion.call(this);

			}





		}

		class zombie {

			constructor(xpos, ypos, speed, health, size) {
				this.xpos = xpos;
				this.ypos = ypos;
				this.speed = speed;
				this.health = health;
				this.size = size;
				this.graphic = zombiegrfx[0][0];
				this.dead = 0;
				this.deadtimer = 0;
				this.deadways = 0;
				this.bulletkilledx = 0;
				this.bulletkilledy = 0;
				this.bulletkilledxtwo = 0;
				this.bulletkilledytwo = 0;
				this.xpostwo = xpos;
				this.ypostwo = ypos;
				this.number = zombies.length - 1;
				this.rotation = 0;
				this.target = 0;
				this.rotationamount = 0;
				this.showdead = 0;

				this.onfire = 0;
				this.onfiretimer = 0;

				this.killedbybulletype = 0;

				this.animationtimer = Math.floor(Math.random() * 15)
				this.animation = Math.floor(Math.random() * 2)
				this.animgraph = 0;

				this.movetimer = Math.floor(Math.random() * 29)* -1;//0;
				this.movex = 0;
				this.movey = 0;


				this.deadwaysamount = 21;
				this.deadwaystype = 1;
				this.deadwayscircleadd = -1;
				this.deadwayscirclesize = 32;
				this.deadwaysrotation = 0;

				this.deadwaysamount = 15;
				this.deadwaystype = 1;
				this.deadwayscircleadd = -2;
				this.deadwayscirclesize = 30;
				this.deadwaysrotation = 0;

				this.deadwaysamount = 21;
				this.deadwaystype = 0;
				this.deadwayscircleadd = -1;
				this.deadwayscirclesize = 32;
				this.deadwaysrotation = 0;


				this.deadwaysamount = 5;
				this.deadwaystype = 2;
				this.deadwayscircleadd = -1;
				this.deadwayscirclesize = 30;
				this.deadwaysrotation = 0;


				this.deadwaysamount = 5;
				this.deadwaystype = 3;
				this.deadwayscircleadd = -1;
				this.deadwayscirclesize = 34;
				this.deadwaysrotation = 0;


				this.deadwaysamount = 21;
				this.deadwaystype = 0;
				this.deadwayscircleadd = -1;
				this.deadwayscirclesize = 32;
				this.deadwaysrotation = 0;




			}

			move() {
				this.movetimer++;
				if (this.movetimer > 0) {
					this.movetimer = -30;
					this.figureoutmove();
				}

				if (this.ypos < 0) {
					this.ypos += 2;
					return;
				}
				if (this.ypos > 720 - 32) {
					this.ypos -= 2;
					return;
				}

				if (this.xpos < 0) {
					this.xpos += 2;
					return;
				}
				if (this.xpos > 1280 - 32) {
					this.xpos -= 2;
					return;
				}

				if (this.onfire == 0) {
					this.xpos += this.movex;
					this.ypos += this.movey;
				}
				else if (this.onfire == 1) {
					this.xpos -= this.movex;
					this.ypos -= this.movey;
					this.onfiretimer++;
					if (this.onfiretimer > 39) {
						this.onfire = 0;
					}
				}


			}

			figureoutmove() {

				let xdif = players[this.target].xpos - this.xpos;
				let ydif = players[this.target].ypos - this.ypos;



				let z = Math.atan2(ydif, xdif);

				let g = z * 180 / Math.PI;

				let rand = Math.floor(Math.random() * 15);

				if (Math.random() * 2 > 1) {
					rand *= -1;
				}
				g += rand;
				z = g * Math.PI / 180;

				this.movex = Math.cos(z) * this.speed;
				this.movey = Math.sin(z) * this.speed;

				//this.movey = 0;
				//this.movex = 0;
				//this.xpos = 640;
				//this.ypos = 360;

				this.rotation = g;



				if (g < 0 && g >= -90) {
					g = 90 - Math.abs(g) + 270;
				}
				if (g < -90) {
					g = 90 - Math.abs(g) + 270;
				}

				//console.log(g);








				if (g > 315 || g < 45) {
					this.graphic = zombiegrfx[1][this.animation];
					this.rotationamount = g;
					this.animgraph = 1;
				}
				if (g > 45 && g < 135) {
					this.graphic = zombiegrfx[0][this.animation];
					this.rotationamount = 0;
					this.animgraph = 0;
					if (g < 90) {
						this.rotationamount = -20 + (20 * ((g - 45) / 45));
					}
					if (g > 90) {
						this.rotationamount = (20 * ((g - 90) / 45));
					}
				}
				if (g > 135 && g < 225) {
					this.graphic = zombiegrfx[2][this.animation];
					this.rotationamount = g - 180;
					this.animgraph = 2;
				}
				if (g > 225 && g < 315) {
					this.graphic = zombiegrfx[3][this.animation];
					this.animgraph = 3;
					this.rotationamount = 0;
					if (g < 270) {
						this.rotationamount = -20 + (20 * ((g - 225) / 45));
					}
					if (g > 270) {
						this.rotationamount = (20 * ((g - 270) / 45));
					}
				}

			}

			draw() {

				if (this.dead == 1) {
					this.deadtimer++;
					this.drawdead();//ctx.drawImage(this.graphic, this.xpos, this.ypos, 64, 64);
					if (this.deadtimer > 0 && this.deadways < 100) {
						this.deadtimer = -5;
						if (this.deadwayscirclesize < 1) {
							this.deadways = 200;
							return;
						}
						bloodgeneration.call(this);
					}
					//ctx.drawImage(this.graphic, this.xpos, this.ypos, 64*3, 64*3);
					return;
				}

				this.animationtimer++;

				if (this.animationtimer >= (30/this.speed)) {
					if (this.animation == 1) {
						this.animation = 0;
					}
					else if (this.animation == 0) {
						this.animation = 1;
					}
					this.animationtimer = 0;
					this.graphic = zombiegrfx[this.animgraph][this.animation];
				}

				this.move();



				let m = this.size[0] / 2 * 0.84375;//32; //27


				ctx.translate(this.xpos + m, this.ypos + m);
				ctx.rotate(this.rotationamount * Math.PI / 180);
				ctx.drawImage(this.graphic, -m, -m, this.size[0], this.size[1]);
				ctx.rotate(this.rotationamount * Math.PI / 180 * -1);
				ctx.translate(-this.xpos - m, -this.ypos - m);
				//ctx.drawImage(this.graphic, this.xpos, this.ypos, 64, 64);



			}

			drawdead() {
				if (this.showdead == 0) {
					return;
				}

				let m = this.size[0] / 2 * 0.84375//27;
				let n = 32;

				//console.log(this.deadwaysrotation)
				let r = this.deadwaysrotation + 90;


				ctx.translate(this.xpos + m, this.ypos + m);
				ctx.rotate(r * Math.PI / 180);
				ctx.drawImage(this.graphic, -m, -m, this.size[0] * 0.84375, this.size[1] * 0.84375); ///54,54
				ctx.rotate(r * Math.PI / 180 * -1);
				ctx.translate(-this.xpos - m, -this.ypos - m);

			}


			collide(m) {

				if (this.dead == 1) {
					return;
				}
				for (let x = 0; x < bullets.length; x++) {



					var xdif = bullets[x].xpos - (this.xpos + this.size[0] / 2);//32);
					var ydif = bullets[x].ypos - (this.ypos + this.size[1] / 2);//32);
					let hitted = false;

					if (this.size[0] / 2 > Math.sqrt((xdif * xdif) + (ydif * ydif))) {
						hitted = true;
					}

					if (this.size[0] !== this.size[1] && hitted == false) {
						var xdif = bullets[x].xpos - (this.xpos + this.size[0] / 2);//32);
						var ydif = bullets[x].ypos - (this.ypos + this.size[1] * 0.666);//32);

						if (this.size[0] / 2 > Math.sqrt((xdif * xdif) + (ydif * ydif))) {
							hitted = true;
						}
					}
					if (this.size[0] !== this.size[1] && hitted == false) {
						var xdif = bullets[x].xpos - (this.xpos + this.size[0] / 2);//32);
						var ydif = bullets[x].ypos - (this.ypos + this.size[1] / 5);//32);

						if (this.size[0] / 3 > Math.sqrt((xdif * xdif) + (ydif * ydif))) {
							hitted = true;
						}
					}

					if (hitted == true) {

						this.bulletkilledx = bullets[x].xspeed;
						this.bulletkilledy = bullets[x].yspeed;
						this.deadwaysrotation = bullets[x].rotation;
						players[bullets[x].player].score++;
						this.health -= bullets[x].power;

						this.killedbybulletype = bullets[x].type;

						if (bullets[x].type == 7) {
							createflame.call(bullets[x]);
							this.onfire = 1;
						}

						if (bullets[x].rocket == 1) {

							if (bullets[x].rocketremove() == true) {
								bullets.splice(x, 1);
							}
							if (this.health > 0 && bullets[x] !== undefined) {
								this.health -= bullets[x].power;

								if (bullets[x].rocketremove() == true) {
									bullets.splice(x, 1);
								}
							}
							if (this.health > 0 && bullets[x] !== undefined) {
								this.health -= bullets[x].power;

								if (bullets[x].rocketremove() == true) {
									bullets.splice(x, 1);
								}
							}
						}
						if (bullets[x] !== undefined) {
							if (bullets[x].rocket == 0) { bullets.splice(x, 1); }
							
						}

						

							//console.log(this.health);


						let ry = Math.random() * this.size[1] * 2 - this.size[1];//64;
						let rx = Math.random() * this.size[0] * 2 - this.size[0];//64;
						if ((bullets[x]!==undefined && bullets[x].type !== 5) || this.killedbybulletype !==5) {
							bloodgeneration.call({
								deadwaystype: 0, xpos: this.xpos + rx, bulletkilledx: 0, ypos: this.ypos + ry,
								bulletkilledy: 0, deadwayscirclesize: this.size[0] * 0.15625,
								deadways: 5, deadwaysamount: 3,
								deadwayscircleadd: 2, size: this.size

							});
						}


						if (this.health <= 0) {
							this.graphic = zombiegrfx[4][Math.floor(Math.random() * 4)];
							
							this.showdead = 1;

							if (this.killedbybulletype == 5 || this.killedbybulletype == 6) {
								this.showdead = Math.floor(Math.random() * 2);
								if (this.showdead == 0) {
									this.deadways = Math.floor(Math.random() * 80);
								}
							}

							this.die();
							return x;
						}

						hit[hitplaylist].play();
						hitplaylist++;
						if (hitplaylist == hit.length) {
							hitplaylist = 0;
						}
						/*
						var s = new Audio("hit.wav");
						s.volume = 0.1;
						s.playbackRate = Math.floor(Math.random() * 12 + 5) / 10;
						s.play();
						*/
					}
				}
			}

			collidefire(f) {

				if (this.dead == 1) {
					return;
				}

				var xdif = f.xpos - (this.xpos + this.size[0] / 2);//32);
				var ydif = f.ypos - (this.ypos + this.size[1] / 2);//32);
				let hitted = false;

				if (25 > Math.sqrt((xdif * xdif) + (ydif * ydif))) {
					hitted = true;
				}

				if (this.size[0] !== this.size[1] && hitted == false) {
					var xdif = f.xpos - (this.xpos + this.size[0] / 2);//32);
					var ydif = f.ypos - (this.ypos + this.size[1] * 0.666);//32);

					if (25 > Math.sqrt((xdif * xdif) + (ydif * ydif))) {
						hitted = true;
					}
				}
				if (this.size[0] !== this.size[1] && hitted == false) {
					var xdif = f.xpos - (this.xpos + this.size[0] / 2);//32);
					var ydif = f.ypos - (this.ypos + this.size[1] / 5);//32);

					if (25 > Math.sqrt((xdif * xdif) + (ydif * ydif))) {
						hitted = true;
					}
				}

				if (hitted == true) {

					let p = new Audio("onfire.mp3");
					p.playbackRate =1;
					p.currentTime = 0.2;
					p.volume = 0.2;
					p.play();

					this.onfire = 1;
					this.onfiretimer = 0;
					this.health -= 5;

					if (this.health <= 0) {
						this.graphic = zombiegrfx[4][Math.floor(Math.random() * 4)];
						this.showdead = 1;
						this.die();
						return x;
					}

					hit[hitplaylist].play();
					hitplaylist++;
					if (hitplaylist == hit.length) {
						hitplaylist = 0;
					}
				}


			}

			die() {


				if (this.deadwaystype == 1) {

					let r = (this.deadwaysrotation + 90) * Math.PI / 180;


					this.bulletkilledx = Math.cos(r) * 10;
					this.bulletkilledy = Math.sin(r) * 10;

					r = (this.deadwaysrotation - 90) * Math.PI / 180;

					this.bulletkilledxtwo = Math.cos(r) * 10;
					this.bulletkilledytwo = Math.sin(r) * 10;

					//this.xpos += (this.bulletkilledx);
					//this.ypos += (this.bulletkilledy);
					this.xpostwo = this.xpos;// + (this.bulletkilledxtwo);
					this.ypostwo = this.ypos;// + (this.bulletkilledytwo);

				}

				if (this.deadwaystype == 0) {


					this.deadwaysamount = Math.floor(Math.random() * 4) + 18;
					this.deadwaystype = 0;
					if (Math.random() * 2 > 1) {
						this.deadwayscircleadd = -1;
					}
					{
						this.deadwayscircleadd = 1;
					}
					this.deadwayscirclesize = Math.floor(Math.random() * 5) + this.size[0] / 2 * 0.78125;//25;
					//this.deadwaysrotation = 0;
				}

				this.dead = 1;

				

				this.deadtimer = -5;
				//this.graphic =
				if (nuked == 0) {
					//	var die = new Audio("die.wav");
					//	die.play();

					die[dieplaylist].play();
					dieplaylist++;
					if (dieplaylist == die.length) {
						dieplaylist = 0;
					}
				}

				zombieskilled++;

				//bloodgeneration.call(this);



			}


		}

		class player {

			constructor(xpos, ypos, rotation) {

				this.xpos = xpos;
				this.ypos = ypos;
				this.rotation = rotation;
				this.moverotation = 0;
				this.player = players.length;
				this.score = 0;
				this.speed = 4;
				this.weapon = [1, -5, 0];
				this.weaponbullets = 0;


				this.steptimer = 0;

			}


			draw() {

				let m = 32;
				let n = 32;

				ctx.translate(this.xpos + m, this.ypos + n);
				ctx.rotate(this.rotation * Math.PI / 180);
				ctx.drawImage(tank, -m, -n, 64, 64);
				ctx.rotate(this.rotation * Math.PI / 180 * -1);
				ctx.translate(-this.xpos - m, -this.ypos - n);

			}

			shooter(rotation, m) {

				let g = rotation;
				let t = (g) * Math.PI / 180;



				if (g > 180 && g < 270) {
					bullet[0] = this.xpos - Math.sin(t) * 32;
					bullet[1] = this.ypos - Math.cos(t) * 32;
				}
				if (g > 270 && g < 360) {
					bullet[0] = this.xpos - Math.sin(t) * 32;
					bullet[1] = this.ypos + Math.cos(t) * 32;
				}
				if (g > 0 && g < 90) {
					bullet[0] = this.xpos + Math.sin(t) * 32;
					bullet[1] = this.ypos + Math.cos(t) * 32;
				}
				if (g > 90 && g < 180) {
					bullet[0] = this.xpos + Math.sin(t) * 32;
					bullet[1] = this.ypos - Math.cos(t) * 32;
				}


				bullet[2] = Math.cos(t) * 10;
				bullet[3] = Math.sin(t) * 10;

				if (this.weapon[2] == 3) {
					bullets.push(new bulletshot(bullet[0] + (Math.floor(Math.random() * 6 - 3) * bullet[2]), bullet[1] + (Math.floor(Math.random() * 6 - 3) * bullet[3]), bullet[2], bullet[3], g, this.player, this.weapon[0], 0, this.weapon[2] ));
				}
				else if (this.weapon[2] == 4) {
					bullets.push(new bulletshot(bullet[0] + (bullet[2] * m), bullet[1] + (bullet[3] * m), bullet[2], bullet[3], g, this.player, this.weapon[0], 0, this.weapon[2]));
				}
				else if (this.weapon[2] == 5) {
					let z = this.fakemove(g - 75, m);
					if (g > 180 && g < 270) {
						bullet[0] = z.xpos - Math.sin(t) * 32;
						bullet[1] = z.ypos - Math.cos(t) * 32;
					}
					if (g > 270 && g < 360) {
						bullet[0] = z.xpos - Math.sin(t) * 32;
						bullet[1] = z.ypos + Math.cos(t) * 32;
					}
					if (g > 0 && g < 90) {
						bullet[0] = z.xpos + Math.sin(t) * 32;
						bullet[1] = z.ypos + Math.cos(t) * 32;
					}
					if (g > 90 && g < 180) {
						bullet[0] = z.xpos + Math.sin(t) * 32;
						bullet[1] = z.ypos - Math.cos(t) * 32;
					}

					bullets.push(new bulletshot(bullet[0], bullet[1], bullet[2], bullet[3], g, this.player, this.weapon[0], 0, this.weapon[2]));

					z = this.fakemove(g + 75, m);
					if (g > 180 && g < 270) {
						bullet[0] = z.xpos - Math.sin(t) * 32;
						bullet[1] = z.ypos - Math.cos(t) * 32;
					}
					if (g > 270 && g < 360) {
						bullet[0] = z.xpos - Math.sin(t) * 32;
						bullet[1] = z.ypos + Math.cos(t) * 32;
					}
					if (g > 0 && g < 90) {
						bullet[0] = z.xpos + Math.sin(t) * 32;
						bullet[1] = z.ypos + Math.cos(t) * 32;
					}
					if (g > 90 && g < 180) {
						bullet[0] = z.xpos + Math.sin(t) * 32;
						bullet[1] = z.ypos - Math.cos(t) * 32;
					}

					bullets.push(new bulletshot(bullet[0], bullet[1], bullet[2], bullet[3], g, this.player, this.weapon[0], 0, this.weapon[2]));

				}
				else if (this.weapon[2] == 6) {
					bullets.push(new bulletshot(bullet[0], bullet[1], bullet[2], bullet[3], g, this.player, this.weapon[0], 1, this.weapon[2]));
				}
				else if (this.weapon[2] == 7) {
					bullets.push(new bulletshot(bullet[0], bullet[1], bullet[2], bullet[3], g, this.player, this.weapon[0], 0, this.weapon[2]));
					
				}
				else {
					bullets.push(new bulletshot(bullet[0], bullet[1], bullet[2], bullet[3], g, this.player, this.weapon[0], 0, this.weapon[2]));

				}


			}

			fakemove(n, m) {

				let t = (n) * Math.PI / 180;
				//players[0].move();
				return {
					xpos: this.xpos + Math.cos(t) * 8 * m,
					ypos: this.ypos + Math.sin(t) * 8 * m
				};

			}


		}


		class pickup {

			constructor() {

				this.xpos = Math.random() * 1100 + 64;
				this.ypos = Math.random() * 620 + 64;
				this.timer = 1000;
				this.type = Math.floor(Math.random() * 10);
				this.flashtimer = 0;
				this.flashlengthtimer = 0;
				this.number = pickups.length;

				this.player = 0;

				//this.graphic = pickupgraphics[1];
				this.graphic = pickupgraphics[this.type];


			}

			draw() {
				//return;
				this.collide();
				this.flashtimer++;
				this.timer--;

				if (this.timer < 0) {
					this.destroy();
					return;
				}

				if (this.timer < 0) {
					pickups[0] = [];
				}

				if (this.flashtimer > 120 - (1000 - this.timer) * 0.1) {
					this.flashtimer = 0;
				}

				if (this.flashtimer > 60 - (1000 - this.timer) * 0.05 && this.timer < 1000) {
					ctx.globalAlpha = 0.2;
					ctx.drawImage(this.graphic, this.xpos + 6, this.ypos + 6, 40, 40);
					ctx.globalAlpha = 1;
					this.flashlengthtimer++;
					if (this.flashlengthtimer > 10) {
						this.flashlengthtimer = 0;
						this.flashtimer = 0;
					}
					return;
				}

				ctx.save();
				ctx.beginPath();
				ctx.arc(this.xpos+20, this.ypos+30, 32, 0, 2 * Math.PI);
				ctx.globalAlpha = 0.5;
				ctx.fillStyle = "green";
				ctx.fill();
				ctx.restore();

				ctx.drawImage(this.graphic, this.xpos, this.ypos, 52, 52);

			}

			collide() {

				if (this.timer < 1) {
					return;
				}

				let xdif = players[0].xpos + 32 - (this.xpos + 26);//32);
				let ydif = players[0].ypos + 32 - (this.ypos + 26);//32);

				if (26 > Math.sqrt((xdif * xdif) + (ydif * ydif))) {
					this.activate();
					this.destroy();
					let s = new Audio("pickitem.mp3");
					s.playbackRate = 1.2;
					s.play();
				}

			}

			activate() {

				if (this.type == 0) {
					nuke();
				}

				if (this.type <= 7 && this.type !==0) {


					for (let x = 0; x < 3; x++) {
						players[0].weapon[x] = weaponslist[this.type][x];
					}
					players[0].weaponbullets = weaponslist[this.type][3];

				}

				if (this.type == 8) {
					flamerain.push(new flameraindrop());

				}

				if (this.type == 9) {

					sprinklers.push(new sprinkler(this.xpos, this.ypos));
				}

			}

			destroy() {

				this.timer = -100;
			}


		}

		var weaponslist = [
			[1, -5, 0, 0],
			[1, -1, 1, 200],
			[1, -5, 2, 100],
			[1, -25, 3, 20],
			[3, -25, 4, 10],
			[5, -30, 5, 5],
			[10, -40, 6, 3],
			[10, -40, 7, 5]
		];

		var shots = [[0, 0]];
		var bullet = [1000, 1000, 0, 0];
		var tank = new Image()
		tank.src = "gun.png";
		var square = new Image()
		square.src = "square.png";

		var pickupgraphics = [];
		pickupgraphics[0] = new Image();
		pickupgraphics[0].src = "nuke.png";
		pickupgraphics[1] = new Image();
		pickupgraphics[1].src = "machinegun.png";
		pickupgraphics[2] = new Image();
		pickupgraphics[2].src = "spreader.png";
		pickupgraphics[3] = new Image();
		pickupgraphics[3].src = "shotgun.png";
		pickupgraphics[4] = new Image();
		pickupgraphics[4].src = "lasergun.png";
		pickupgraphics[5] = new Image();
		pickupgraphics[5].src = "superlasergun.png";
		pickupgraphics[6] = new Image();
		pickupgraphics[6].src = "rocketgun.png";
		pickupgraphics[7] = new Image();
		pickupgraphics[7].src = "flamegun.png";
		pickupgraphics[8] = new Image();
		pickupgraphics[8].src = "flamerainpickup.png";
		pickupgraphics[9] = new Image();
		pickupgraphics[9].src = "sprinklerpickup.png";

		//var zombiegrfx = [];
		var zombiegrfx = Array.from(Array(5), () => new Array(2));
		zombiegrfx[0][0] = new Image()
		zombiegrfx[0][0].src = "zombie.png";
		zombiegrfx[0][1] = new Image()
		zombiegrfx[0][1].src = "zombie2.png";
		zombiegrfx[1][0] = new Image()
		zombiegrfx[1][0].src = "zombieright.png";
		zombiegrfx[1][1] = new Image()
		zombiegrfx[1][1].src = "zombieright2.png";
		zombiegrfx[2][0] = new Image()
		zombiegrfx[2][0].src = "zombieleft.png";
		zombiegrfx[2][1] = new Image()
		zombiegrfx[2][1].src = "zombieleft2.png";
		zombiegrfx[3][0] = new Image()
		zombiegrfx[3][0].src = "zombieback.png";
		zombiegrfx[3][1] = new Image()
		zombiegrfx[3][1].src = "zombieback2.png";
		zombiegrfx[4][0] = new Image();
		zombiegrfx[4][0].src = "zombiedead.png";
		zombiegrfx[4][1] = new Image();
		zombiegrfx[4][1].src = "zombiebackdead.png";
		zombiegrfx[4][2] = new Image();
		zombiegrfx[4][2].src = "zombierightdead.png";
		zombiegrfx[4][3] = new Image();
		zombiegrfx[4][3].src = "zombieleftdead.png";

		var bulletgraphics = [];
		bulletgraphics[0] = new Image();
		bulletgraphics[0].src = "square.png";
		bulletgraphics[1] = new Image();
		bulletgraphics[1].src = "square.png";
		bulletgraphics[2] = new Image();
		bulletgraphics[2].src = "square.png";
		bulletgraphics[3] = new Image();
		bulletgraphics[3].src = "square.png";
		bulletgraphics[4] = new Image();
		bulletgraphics[4].src = "laser.png";
		bulletgraphics[5] = new Image();
		bulletgraphics[5].src = "laser.png";
		bulletgraphics[6] = new Image();
		bulletgraphics[6].src = "rocket.png";
		bulletgraphics[7] = new Image();
		bulletgraphics[7].src = "rocket.png";

		var flamegraphics = [];
		flamegraphics[0] = new Image();
		flamegraphics[0].src = "flameshot.png";
		flamegraphics[1] = new Image();
		flamegraphics[1].src = "flameshot2.png";

		var sprinklergraphics = [];
		sprinklergraphics[0] = new Image();
		sprinklergraphics[0].src = "sprinkler.png";
		sprinklergraphics[1] = new Image();
		sprinklergraphics[1].src = "sprinkler2.png";

		var backgroundgraphic = new Image();
		backgroundgraphic.src = "background3.png";

		var shot = []
		for (x = 0; x < 20; x++) {
			shot[x] = new Audio("shot.wav");
			shot[x].playbackRate = 2;
			shot[x].volume = 0.1;
		}
		var shotplaylist = 0;

		var superlasershotsound = new Audio("superlasershot.mp3");
		superlasershotsound.playbackRate = 1;
		//p.currentTime = 0;
		superlasershotsound.volume = 0.2;

		var buckshotsound = new Audio("buckshotshot.mp3");
		buckshotsound.playbackRate = 1;
		//p.currentTime = 0;
		buckshotsound.volume = 0.2;

		var hit = []
		for (x = 0; x < 20; x++) {
			hit[x] = new Audio("hit.wav");
			hit[x].playbackRate = Math.floor(Math.random() * 12 + 5) / 10;
			hit[x].volume = 0.1;
		}
		var hitplaylist = 0;

		var die = []
		for (x = 0; x < 20; x++) {
			die[x] = new Audio("die.wav");
			die[x].playbackRate = Math.floor(Math.random() * 10 + 6) / 10;
		}
		var dieplaylist = 0;


		var rotation = 0;

		var xpos = 640;
		var ypos = 360;

		var circlex = Math.random() * 1100;
		var circley = Math.random() * 600;

		var bullettimer = 0;

		var bullets = [];
		var zombies = [];
		var zombietimer = 1;

		var nuked = 0;

		var zombieskilled = 0;

		var boss = 0;

		var players = [];

		var pickups = [];

		var explosiongraph = [];

		var flames = [];

		var flamerain = [];

		var sprinklers = [];

		pickups[0] = new pickup();

		players[0] = new player(640, 320, 0);

		var itemtimer = 0;

		var cleantimer = 0;

		//c.width = 1920;
		//c.height = 1080;

		var scalesize = 1;

		//boss = 1;
		//zombies.push(new zombie(Math.floor(Math.random() * 200 + 1100), Math.floor(Math.random() * 300 + 240), 5, 1));
		//sprinklers.push(new sprinkler(640, 360));
		var endtime = new Date();
		var starttime = new Date();

		//if (endtime - started > 16) {
		//	console.log(endtime - started);
		//}

		var skipme = 0;

		function main() {
			//let started = new Date();

			 endtime = new Date()
			if (endtime - starttime > 17) {
				console.log(endtime - starttime)
				if (skipme == 0) {
					skipme = 1;
				}else if (skipme == 1) {
					skipme = 0;
				}
			}
			starttime = new Date();



			var controller;
			var controllerone;
			var controllertwo;

			controller = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);//navigator.getGamepads();

			controllerone = controller[0];

			bullettimer++;

			if (players[0].weapon[2] !== 0 && players[0].weaponbullets <= 0) {

				players[0].weapon = [1, -5, 0];

			}

			if (controller !== undefined && controllerone !== null) {

				
				if (controllerone.buttons[6].pressed == true) {
					///left trig
					zombietimer = 1;
				}
				if (controllerone.buttons[7].pressed == true) {
					////right trig
					nuke()
				}
				if (controllerone.buttons[5].pressed == true) {
					///right shoulder

					sprinklers.push(new sprinkler(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 680)));
				}
				if (controllerone.buttons[4].pressed == true) {
					///left shoulder
					flames.push(new flamegraphic(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 680)));
				}
				if (controllerone.buttons[3].pressed == true) {
					////right trig
				}
				if (controllerone.buttons[2].pressed == true) {
					////right trig
					zombietimer = 1;
				}
				

				if (Math.abs(controllerone.axes[2]) > 0.3 || Math.abs(controllerone.axes[3]) > 0.3) {



					y = Math.atan(controllerone.axes[3] / controllerone.axes[2]);

					g = y * 180 / Math.PI;


					if (g < 0 && g > -90) {
						g = 90 - Math.abs(g) + 90;
					}
					if (g > 0 && controllerone.axes[3] < 0) {
						g = Math.abs(g) + 180;
					}
					if (g < 0 && controllerone.axes[3] < 0) {
						g = 90 - Math.abs(g) + 90;
					}
					if (g < 0 && controllerone.axes[3] > 0) {
						g = 90 - Math.abs(g) + 270;
					}


					players[0].rotation = g;
					if (bullettimer > 0 && (players[0].weapon[2] == 0 || players[0].weapon[2] == 1)) {
						bullettimer = -5;
						players[0].shooter(g);
						bullettimer = players[0].weapon[1];
						players[0].weaponbullets--;

					}
					if (bullettimer > 0 && (players[0].weapon[2] == 2)) {

						players[0].shooter(g);
						players[0].shooter(g + 15);
						players[0].shooter(g - 15);
						bullettimer = players[0].weapon[1];
						players[0].weaponbullets--;

					}
					if (bullettimer > 0 && (players[0].weapon[2] == 3)) {

						for (let y = 0; y < 10; y++) {
							players[0].shooter(g + Math.random() * 10);
							players[0].shooter(g - Math.random() * 10);
						}
						bullettimer = players[0].weapon[1];
						players[0].weaponbullets--;

					}
					if (bullettimer > 0 && (players[0].weapon[2] == 4)) {

						for (let y = 0; y < 10; y++) {
							players[0].shooter(g, y);
						}
						bullettimer = players[0].weapon[1];
						players[0].weaponbullets--;

					}
					if (bullettimer > 0 && (players[0].weapon[2] == 5)) {

						for (let y = 0; y < 30; y++) {
							players[0].shooter(g, y);
							players[0].shooter(g, y);
						}
						bullettimer = players[0].weapon[1];
						players[0].weaponbullets--;
						superlasershotsound.currentTime = 0;
						superlasershotsound.play();

					}
					if (bullettimer > 0 && (players[0].weapon[2] == 6)) {

						players[0].shooter(g);

						bullettimer = players[0].weapon[1];
						players[0].weaponbullets--;

					}
					if (bullettimer > 0 && (players[0].weapon[2] == 7)) {

						players[0].shooter(g);

						bullettimer = players[0].weapon[1];
						players[0].weaponbullets--;

					}



				}


				if (Math.abs(controllerone.axes[0]) > 0.3 || Math.abs(controllerone.axes[1]) > 0.3) {
					if (Math.abs(controllerone.axes[0]) + Math.abs(controllerone.axes[1]) > 0.3) {

						//console.log(controllerone.axes[0])

						y = Math.atan(controllerone.axes[1] / controllerone.axes[0]);

						g = y * 180 / Math.PI;



						//console.log(controllerone.axes[0])

						if (g > 0 && controllerone.axes[0] > 0) {

						}
						else if (g < 0 && controllerone.axes[0] < 0) {

							g = 90 - Math.abs(g) + 90;
						}
						else if (g > 0 && controllerone.axes[0] < 0) {

							g = 180 + g;
						}
						else if (g < 0 && controllerone.axes[0] > 0) {

							g = 90 - Math.abs(g) + 270;
						}
						//	console.log(g);



						let b = Math.abs(controllerone.axes[0]) + Math.abs(controllerone.axes[1]);

						if (b > 1) {
							b = 1;
						}

						//console.log(b)

						players[0].speed = 5 * b;
						players[0].moverotation = g;

						let t = (g) * Math.PI / 180;
						//players[0].move();
						players[0].xpos += Math.cos(t) * players[0].speed;
						players[0].ypos += Math.sin(t) * players[0].speed;

					}

					


					//this.movex = Math.cos(z) * 2;
					//this.movey = Math.sin(z) * 2;

					//console.log(controllerone.axes[0], controllerone.axes[1])
					/*
					if (controllerone.axes[0] > 0.5) {
						players[0].xpos += 3;
					}
					if (controllerone.axes[0] < -0.5) {
						players[0].xpos -= 3;
					}
					if (controllerone.axes[1] > 0.5) {
						players[0].ypos += 3;
					}
					if (controllerone.axes[1] < -0.5) {
						players[0].ypos -= 3;
					}
					*/
				}

			}

		/*	ctx.beginPath();
			ctx.rect(0, 0, 1280 * scalesize, 720 * scalesize);
			ctx.fillStyle = "white";
			ctx.fill();

			ctx.lineWidth = 5;
			ctx.strokeRect(0, 0, 1280 * scalesize, 720 * scalesize);

			ctx.fillStyle = "black"; */

			ctx.drawImage(backgroundgraphic, 0, 0);
			//ctx.fillRect((c.width / 2) - 50, c.height / 2 - 50, 100, 100);

			ctx.drawImage(bloodcanvas, 0, 0, 1280 * scalesize, 720 * scalesize);

			//	shoot();



			if (flamerain[0] !== undefined) {

				for (x = 0; x < flamerain.length; x++) {
					flamerain[x].draw();
				}
				for (x = 0; x < flamerain.length; x++) {
					if (flamerain[x] == undefined) {
						break;
					}
					if (flamerain[x].flamesleft <= 0) {
						flamerain.splice(x, 1);
						if (x !== flamerain.length - 1) {
							x--;
						}
					}
				}

			}
			if (sprinklers[0] !== undefined) {

				for (x = 0; x < sprinklers.length; x++) {
					sprinklers[x].draw();
				}
				for (x = 0; x < sprinklers.length; x++) {
					if (sprinklers[x] == undefined) {
						break;
					}
					if (sprinklers[x].shots <= 0) {
						sprinklers.splice(x, 1);
						if (x !== sprinklers.length - 1) {
							x--;
						}
					}
				}

			}

			itemtimer++;

			if (itemtimer > 90) {
				itemtimer = 0;
				pickups.push(new pickup());
			}

			if (pickups[0] !== undefined) {
				for (x = 0; x < pickups.length; x++) {
					pickups[x].draw();
				}

				for (x = 0; x < pickups.length; x++) {
					if (pickups[x] == undefined) {
						break;
					}
					if (pickups[x].timer < 0) {
						pickups.splice(x, 1);
						if (x !== pickups.length - 1) {
							x--;
						}
					}
				}

			}


			//rotation++;
			if (rotation > 360) {
				rotation = 0;
			}



			zombietimer++;

			if (zombieskilled > 99 && boss == 0) {

				//bossspawn();

			}

			nukedtimer++;
			if (nuked == 1) {
				nuke();
			}

			if (zombietimer == -20) {

				//var buzz = new Audio("buzz.mp3");
				//buzz.volume = 0.2;
				//buzz.play();

			}

			if (zombietimer > 0 && boss == 0) {


				if (spawnenemies(Math.floor(Math.random() * 4)) < 10) {
					spawnenemies(Math.floor(Math.random() * 4));
				}

				/*
				//right spawn
				zombies.push(new zombie(Math.floor(Math.random() * 100 + 1280 + 50), Math.floor(Math.random() * 300 + 240), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 100 + 1280 + 50), Math.floor(Math.random() * 300 + 240), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 100 + 1280 + 50), Math.floor(Math.random() * 300 + 240), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 100 + 1280 + 50), Math.floor(Math.random() * 300 + 240), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 100 + 1280 + 50), Math.floor(Math.random() * 300 + 240), 5, 1));

				/*
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 1100), Math.floor(Math.random() * 300 + 240), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 1100), Math.floor(Math.random() * 300 + 240), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 1100), Math.floor(Math.random() * 300 + 240), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 1100), Math.floor(Math.random() * 300 + 240), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 1100), Math.floor(Math.random() * 300 + 240), 5, 1));
				*/

				//top spawn
				//zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 * -1 - 50), 5, 1));
				//zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 * -1 - 50), 5, 1));
				//zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 * -1 - 50), 5, 1));
				/*
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 + 0), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 + 0), 5, 1));
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 + 0), 5, 1));
				*/

				/*
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 + 620), 5, 1));
				*/

				//down spawn
				//zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 + 720 + 50), 5, 1));

				/*
				zombies.push(new zombie(Math.floor(Math.random() * 200), Math.floor(Math.random() * 300 + 240), 5, 1));
				*/
				/*
				//left spawn
				zombies.push(new zombie(Math.floor(Math.random() * 100 * -1 - 50), Math.floor(Math.random() * 300 + 240), 5, 1));
				*/

				zombietimer = -180;
			}


			if (zombies[0] !== undefined) {
				for (x = 0; x < zombies.length; x++) {
					zombies[x].draw();
					if (bullets[0] !== undefined) {
						zombies[x].collide();

					}
				}
			}
			


			for (let x = 0; x < players.length; x++) {

				players[x].draw();

				players[x].steptimer++;

				/*if (players[x].steptimer >= 30) {
					bloodgeneration.call({
						deadwaystype: 0, xpos: players[x].xpos + 16, bulletkilledx: 0, ypos: players[x].ypos + 16,
						bulletkilledy: 0, deadwayscirclesize: 5,
						deadways: 5, deadwaysamount: 0,
						deadwayscircleadd: 2
					});
					players[x].steptimer = 0;
				}*/

			}


			if (zombies[0] !== undefined) {
				for (x = 0; x < zombies.length; x++) {
					if (zombies[x].deadways > 100 || (zombies[x].deadways > 99 && nukedtimer < 99)) { //100
						zombies.splice(x, 1);
					}
				}
			}

			cleantimer++;
			//cleanblood();
			//cleanerblood();
			cleanercleaner();
			if (cleantimer > 60 && nukedtimer > 99) {
				if (zombies[0] !== undefined) {
					if (zombies[0].deadways > 99) {
						zombies.splice(0, 1);

						cleantimer = 0;
					}
				}
			}


			if (bullets[0] !== undefined) {
				for (x = 0; x < bullets.length; x++) {
					bullets[x].draw();
					if (((bullets[x].xpos > 1260 || bullets[x].xpos < 20 || bullets[x].ypos > 700 || bullets[x].ypos < 20) && bullets[x].rocket == 1)) {
						explosion.call(bullets[x]);
						bullets.splice(x, 1);
						if (x !== bullets.length - 1) {
							x--;
						}
						continue;
					}

					if (((bullets[x].xpos > 1260 || bullets[x].xpos < 20 || bullets[x].ypos > 700 || bullets[x].ypos < 20) && bullets[x].type == 7)){
						createflame.call(bullets[x])

						bullets.splice(x, 1);
						if (x !== bullets.length - 1) {
							x--;
						}
						continue;
					}

					if (((bullets[x].xpos > 1300 || bullets[x].xpos < -10 || bullets[x].ypos > 740 || bullets[x].ypos < -10) && (players[bullets[x].player].weapon[2] !== 5)) || 
						(players[bullets[x].player].weapon[2] == 5 && (bullets[x].xpos > 1400 || bullets[x].xpos < -110 || bullets[x].ypos > 840 || bullets[x].ypos < -110)) || bullets[x].flametimer > 39) {

						if (bullets[x].type == 7) {
							//createflame.call(bullets[x]);
						}

						bullets.splice(x, 1);
						if (x !== bullets.length - 1) {
							x--;
						}
					}
				}
			}

			if (flames[0] !== undefined) {

				for (let x = 0; x < flames.length; x++) {
					flames[x].timer++;
					flames[x].draw();

					if (flames[x].timer > 900) {
						flames.splice(0, 1);
					}
				}
			}

			if (explosiongraph[0] !== undefined) {

				for (let x = 0; x < explosiongraph.length; x++) {
					explosiongraph[x].timer++;
					explosiongraph[x].draw();
					
					if (explosiongraph[x].timer > 15) {
						explosiongraph.splice(0, 1);
					}
				}
			}

			//let endtime = new Date();

			//if (endtime - started > 16) {
			//	console.log(endtime - started);
			//}


			//spotlights();
			//dusk();

			//truectx.drawImage(c, 0, 0, 1920, 1080);

		}

		function dusk() {

			truectx.clearRect(0, 0, 1280, 720);
			truectx.globalAlpha = 0.2;
			truectx.fillStyle = "orange";
			truectx.globalAlpha = 0.2;
			truectx.fillStyle = "#888888";
			truectx.fillRect(0, 0, 1280, 720);/*
			truectx.globalAlpha = 0.2;
			truectx.fillStyle = "black";
			truectx.fillRect(0, 0, 1280, 720);*/
			ctx.drawImage(truecanvas, 0, 0)

		}

		var glowinglight = 0;
		var glowinglighttimer = 1;

		function spotlights() {

			truectx.clearRect(0, 0, 1280, 720);
			truectx.globalAlpha = 0.95;//9
			truectx.fillStyle = "black";
			truectx.fillRect(0, 0, 1280, 720);

			truectx.save();
			truectx.beginPath();
			truectx.arc(players[0].xpos + 32, players[0].ypos + 32, 150, 0, 2 * Math.PI);
			truectx.clip();
			truectx.clearRect(0, 0, 1280, 720);
			truectx.restore();


			glowinglighttimer++;

			let grd = truectx.createRadialGradient(1100, 360, 65, 1100, 360, 150);
			if (glowinglight == 0) {
				grd.addColorStop(0, "orange");
				grd.addColorStop(1, "red");
			} else {
				grd.addColorStop(0, "red");
				grd.addColorStop(1, "orange");
			}

			if (glowinglighttimer == 15) {
				if (glowinglight == 0) {
					glowinglight=1
				} else {
					glowinglight = 0;
				}
				glowinglighttimer = 0;
				
			}
			
			

			truectx.save();
			truectx.beginPath();
			truectx.arc(1100, 360, 150, 0, 2 * Math.PI);
			truectx.clip();
			truectx.clearRect(0, 0, 1280, 720);
			truectx.globalAlpha = 0.5;
			truectx.fillStyle = grd;
			truectx.fillRect(0, 0, 1280, 720);
			truectx.restore();

			ctx.drawImage(truecanvas, 0, 0)
		}

		var truecanvas = document.createElement("canvas");
		truecanvas.width = 1280;
		truecanvas.height = 720;

		var truectx = truecanvas.getContext("2d");


		function createflame() {

			/* let grd = bloodctx.createRadialGradient(this.xpos, this.ypos, 1, this.xpos, this.ypos, 25);
			grd.addColorStop(0, "orange");
			grd.addColorStop(1, "red");
			bloodctx.beginPath();
			bloodctx.arc(this.xpos, this.ypos, 25, 0, 2 * Math.PI);
			bloodctx.fillStyle = grd;
			bloodctx.fill(); */

			flames.push(new flamegraphic(this.xpos, this.ypos));

			

		}

		

		function explosion() {

			//console.log("zombies: ", zombies.length);

			let zdead = 0;

			
			explosiongraph.push(new explosiongraphic(this.xpos, this.ypos));

			if (zombies[0] !== undefined) {
				let previous = { xpos: zombies[0].xpos, ypos: zombies[0].ypos };
			}

			


			for (let x = 0; x < zombies.length; x++) {


				if (zombies[x].dead == 1) {
					continue;
				}

				bloodgeneration.call({
					deadwaystype: 0, xpos: 300, bulletkilledx: 0, ypos: 300,
					bulletkilledy: 0, deadwayscirclesize: 32,
					deadways: Math.floor(Math.random() * 25 + 75), deadwaysamount: 0,
					deadwayscircleadd: 2, size: 32
				});

				var xdif = this.xpos - (zombies[x].xpos + zombies[x].size[0] / 2);//32);
				var ydif = this.ypos - (zombies[x].ypos + zombies[x].size[1] / 2);//32);

				//console.log(Math.sqrt((xdif * xdif) + (ydif * ydif)));

				if (150 > Math.sqrt((xdif * xdif) + (ydif * ydif))) {
					nukedtimer = -30;


					zombies[x].killedbybulletype = 5;
					zombies[x].bulletkilledx = Math.floor(Math.random() * 8);
					zombies[x].bulletkilledy = Math.floor(Math.random() * 8);
					zombies[x].deadwaysrotation = Math.random() * 359;
					players[this.player].score++;
					zombies[x].health -= 10;


					let ry = Math.random() * zombies[x].size[1] * 2 - zombies[x].size[1];//64;
					let rx = Math.random() * zombies[x].size[0] * 2 - zombies[x].size[0];//64;
					/*bloodgeneration.call({
						deadwaystype: 0, xpos: zombies[x].xpos + rx, bulletkilledx: 0, ypos: zombies[x].ypos + ry,
						bulletkilledy: 0, deadwayscirclesize: zombies[x].size[0] * 0.15625,
						deadways: 5, deadwaysamount: 3,
						deadwayscircleadd: 2, size: zombies[x].size
					});*/

					bloodgeneration.call(zombies[x]);
					zombies[x].deadways = 0;



					if (zombies[x].health <= 0) {
						zdead++;
						zombies[x].graphic =zombiegrfx[4][Math.floor(Math.random() * 4)];
						//zombies[x].showdead = 1;

						zombies[x].showdead = Math.floor(Math.random() * 2);
						if (zombies[x].showdead == 0) {
							zombies[x].deadways = Math.floor(Math.random() * 80);
						}
						

						zombies[x].bulletkilledx = Math.floor(Math.random() * 15);
						zombies[x].bulletkilledy = Math.floor(Math.random() * 15);
						zombies[x].deadwaysrotation = Math.floor(Math.random() * 359);
						zombies[x].deadwaystype = Math.floor(Math.random() * 4);
						zombies[x].deadwaysamount = 5;

						if (x > 300) {
							let xdif = previous.xpos - (zombies[x].xpos + zombies[x].size[0] / 2);//32);
							let ydif = previous.ypos - (zombies[x].ypos + zombies[x].size[1] / 2);//32);


							//console.log(Math.sqrt((xdif * xdif) + (ydif * ydif)))

							if (300 > Math.sqrt((xdif * xdif) + (ydif * ydif)) && x !== 0) {
								zombies[x].deadways = 120;
								//console.log("zombie ", x, " was close to another");
							}
							else {
								previous = { xpos: zombies[x].xpos, ypos: zombies[x].ypos };
							}
						}
						

						zombies[x].die();
					}

					//hit[hitplaylist].play();
					hitplaylist++;
					if (hitplaylist == hit.length) {
						hitplaylist = 0;
					}
				}

			}
			console.log("zdead: ", zdead)
		}

		function bossspawn() {

			nuke();

			boss = 1;
			xpos = 680;
			ypos = 680;

			for (let x = 0; x < 300; x++) {
				zombies.push(new zombie(Math.floor(Math.random() * 200 + 500), Math.floor(Math.random() * 200 + 260), 5, 1));
			}


		}

		function spawnenemies(m) {

			let r = Math.floor(Math.random() * 20)
			//m = 4;
			//r = 1;

			for (let x = 0; x < r; x++) {
				if (m == 0) {
					zombies.push(new zombie(Math.floor(Math.random() * 100 + 1280 + 50), Math.floor(Math.random() * 300 + 240), 2, 1, [64, 64]));
				}

				else if (m == 1) {
					zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 + 720 + 50), 6, 3, [64, 64]));

				}


				else if (m == 2) {
					zombies.push(new zombie(Math.floor(Math.random() * 100 * -1 - 50), Math.floor(Math.random() * 300 + 240), 2, 1, [64, 64]));

				}


				else if (m == 3) {
					zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 * -1 - 50), 4, 2, [22, 22]));

				}

				else if (m == 4) {
					zombies.push(new zombie(Math.floor(Math.random() * 200 + 450), Math.floor(Math.random() * 100 * -1 - 50), 2, 100, [64, 180]));

				}
			}

			return r;




		}

		var nukedtimer = 100;
		var nukesound = new Audio("die.wav");
		nukesound.playbackRate = 0.2;
		var nukednumber = 0;

		function nuke() {
			//console.log("previous deadways: ", lastuseddeadways);
			bloodgeneration.call({
				deadwaystype: 0, xpos: 300, bulletkilledx: 0, ypos: 300,
				bulletkilledy: 0, deadwayscirclesize: 32,
				deadways: Math.floor(Math.random() * 50 + 50), deadwaysamount: 0,
				deadwayscircleadd: 2, size: 32
			});
			//console.log("current deadways: ", lastuseddeadways);
			console.log("zombies: " + zombies.length);
			nuked = 1;
			nukedtimer = -30;

			zombietimer -= 90;

			nukesound.play();

			if (zombies.length > 500) {
				let limitbloodon = 1;
			}

			if (zombies[0] !== undefined) {
				let previous = { xpos: zombies[0].xpos, ypos: zombies[0].ypos };
				for (x = 0; x < zombies.length; x++) { /////////x<10 x = nukednumber; x < nukednumber+25;

					zombies[x].bulletkilledx = Math.floor(Math.random() * 30);
					zombies[x].bulletkilledy = Math.floor(Math.random() * 30);
					zombies[x].deadwaysrotation = Math.floor(Math.random() * 359);
					zombies[x].deadwaystype = Math.floor(Math.random() * 4);
					zombies[x].deadwaysamount = 5;


					if (limitbloodon = 1) {
						let xdif = previous.xpos - (zombies[x].xpos + zombies[x].size[0] / 2);//32);
						let ydif = previous.ypos - (zombies[x].ypos + zombies[x].size[1] / 2);//32);


						//console.log(Math.sqrt((xdif * xdif) + (ydif * ydif)))

						if (100 > Math.sqrt((xdif * xdif) + (ydif * ydif)) && x !== 0) {
							zombies[x].deadways = 120;
							//console.log("zombie ", x, " was close to another");
						}
						else {
							previous = { xpos: zombies[x].xpos, ypos: zombies[x].ypos };
						}
					}

					zombies[x].die();
				}
			}

			nuked = 0;


		}


		var bloodcanvas = document.createElement("canvas");
		bloodcanvas.width = 1280;
		bloodcanvas.height = 720;

		var bloodctx = bloodcanvas.getContext("2d");


		var tempcanvas = document.createElement("canvas");
		tempcanvas.width = 64;
		tempcanvas.height = 64;

		var tempctx = tempcanvas.getContext("2d");

		var imgdata = ctx.createImageData(64, 64)
		var temp = ctx.createImageData(64, 64)

		var nukedtimepattern = 0;

		function cleanblood() {

			let xcor = Math.floor(Math.random() * 1214);
			let ycor = Math.floor(Math.random() * 656);

			//var temp = bloodctx.createImageData(64, 64)

			var temp = bloodctx.getImageData(xcor, ycor, 64, 64); //64


			//console.log(temp[1])

			
			for (let x = 0; x < 64 * 64 * 4; x += 4) {//64


				v = Math.floor(Math.random() * 255)

				if (temp.data[x] > 149 && v > 180) {
					//temp.data[x] = Math.floor(Math.random() * 100);
					//temp.data[x + 1] = Math.floor(Math.random() * 10);
					//temp.data[x + 2] = Math.floor(Math.random() * 10);
					//temp.data[x + 3] = 255;
					//}
					//else {

					temp.data[x] = 0;
					temp.data[x + 1] = 0; //// 175 guts
					temp.data[x + 2] = 0;
					temp.data[x + 3] = 0;
				}


			}

			bloodctx.putImageData(temp, xcor, ycor);
			


		}

		//var alpha = 1;
		function cleanercleaner() {

			if (nukedtimer < 100) {
				return;
			}

			/*
			tempctx.drawImage(bloodcanvas, 640, 360, 64, 64, 0, 0, 64, 64);

			alpha -= 0.1;
			if (alpha < 0) {

				alpha = 1;
			}

			bloodctx.clearRect(640, 360, 64, 64);
			bloodctx.globalAlpha = alpha;
			if (alpha !== 0) {
				bloodctx.drawImage(tempcanvas, 640, 360, 64, 64);
			}
			else {
				bloodctx.clearRect(0, 0, 64, 64);
			}
			bloodctx.globalAlpha = 1;
			*/
			/*
			bloodctx.save();
			bloodctx.beginPath();
			bloodctx.arc(Math.random() * 1280, Math.random() * 720, 4, 0, 2 * Math.PI);
			bloodctx.clip();
			bloodctx.clearRect(0, 0, 1280, 720);
			bloodctx.arc(Math.random() * 1280, Math.random() * 720, 4, 0, 2 * Math.PI);
			bloodctx.clip();
			bloodctx.clearRect(0, 0, 1280, 720);
			bloodctx.restore();
			*/

			//bloodctx.beginPath();
			//bloodctx.arc(Math.random() * 1280, Math.random() * 720, 14, 0, 2 * Math.PI);
			//bloodctx.fillStyle = "white";
			//bloodctx.fill();

			bloodctx.clearRect(players[0].xpos + 16, players[0].ypos + 16, 32, 32);

			for (let x = 0; x < 100; x++) {
				bloodctx.clearRect(Math.random() * 1280, Math.random() * 720, 4, 4);
			}

			/* bloodctx.clearRect(Math.random() * 1280, Math.random() * 720, 4, 4);
			bloodctx.clearRect(Math.random() * 1280, Math.random() * 720, 4, 4);
			bloodctx.clearRect(Math.random() * 1280, Math.random() * 720, 4, 4);
			bloodctx.clearRect(Math.random() * 1280, Math.random() * 720, 4, 4);
			bloodctx.clearRect(Math.random() * 1280, Math.random() * 720, 4, 4); */

		}

		function cleanerblood() {

			let xcor = Math.floor(Math.random() * 1214);
			let ycor = Math.floor(Math.random() * 656);

			//var temp = bloodctx.createImageData(64, 64)

			for (let x = 0; x < 64 * 64 * 4; x += 4) {


				let v = Math.floor(Math.random() * 255)

				if (temp.data[x + 1] < 10 && v > 100) {
					temp.data[x] = 100 + Math.floor(Math.random() * 100);
					temp.data[x + 1] = Math.floor(Math.random() * 10);
					temp.data[x + 2] = Math.floor(Math.random() * 10);
					temp.data[x + 3] = 255;
				}
				else {

					temp.data[x] = 255;
					temp.data[x + 1] = 255; //// 175 guts
					temp.data[x + 2] = 255;
					temp.data[x + 3] = 255;
				}

			}


			tempctx.putImageData(temp, 0, 0);

			bloodctx.drawImage(tempcanvas, xcor, ycor, 64, 64)




		}

		var lastuseddeadways = 0;

		function bloodgeneration() {

			nukedtimepattern++;

			this.deadways += this.deadwaysamount;
			this.deadwayscirclesize += this.deadwayscircleadd;
			/*
			if (nuked == 0 && nukedtimer > 99 || Number.isInteger(nukedtimepattern / zombies.length)) {



				for (let x = 0; x < 64 * 64 * 4; x += 4) {


					v = Math.floor(Math.random() * 255)

					if (v > 200 - this.deadways * 1.5 || (nukedtimer < 50 && v > 50)) {
						imgdata.data[x] = 150 + Math.floor(Math.random() * 100);
						if (nukedtimer < 0) {
							imgdata.data[x] = 200 + Math.floor(Math.random() * 55);
						}
						imgdata.data[x + 1] = Math.floor(Math.random() * 40);
						imgdata.data[x + 2] = Math.floor(Math.random() * 40);
						imgdata.data[x + 3] = 255;
					}
					else {

						imgdata.data[x] = 185;
						imgdata.data[x + 1] = 185; //// 175 guts
						imgdata.data[x + 2] = 185;
						imgdata.data[x + 3] = Math.floor(Math.random() * 255);
					}


				}




				tempctx.putImageData(imgdata, 0, 0);
			}
			*/

			p = this.deadways;
			if (p > 99) {
				p = 99;
			}

			if (nukedtimer > 99 && this.killedbybulletype !== 5) {
				tempctx.drawImage(bloodgraphics[p][0], 0, 0);
			}

			if (nukedtimer > 99 && this.killedbybulletype == 5 && lastuseddeadways < 75) {
				p = Math.floor(Math.random() * 25 + 75);
				tempctx.drawImage(bloodgraphics[p][0], 0, 0);
			}


			lastuseddeadways = p;

			if (this.deadwayscirclesize <= 0) {

				this.deadwayscirclesize = 1;
			}


			if (this.deadwaystype == 0) {
				this.xpos += this.bulletkilledx;
				this.ypos += this.bulletkilledy;
				bloodctx.beginPath();
				bloodctx.arc(this.xpos + this.size[0] / 2, this.ypos + this.size[1] / 2, this.deadwayscirclesize, 0, 2 * Math.PI);
				bloodctx.fillStyle = bloodctx.createPattern(tempcanvas, "repeat");
				bloodctx.fill();
				return;
			}

			if (this.deadwaystype == 1) {
				this.xpos += this.bulletkilledx;
				this.ypos += this.bulletkilledy;

				this.xpostwo += this.bulletkilledxtwo;
				this.ypostwo += this.bulletkilledytwo;

				bloodctx.beginPath();
				bloodctx.arc(this.xpos, this.ypos, this.deadwayscirclesize / 2, 0, 2 * Math.PI);
				bloodctx.arc(this.xpostwo, this.ypostwo, this.deadwayscirclesize / 2, 0, 2 * Math.PI);
				bloodctx.fillStyle = bloodctx.createPattern(tempcanvas, "repeat");
				bloodctx.fill();
				return;
			}

			if (this.deadwaystype == 2) {
				this.xpos += this.bulletkilledx;
				this.ypos += this.bulletkilledy;
				bloodctx.beginPath();
				bloodctx.arc(this.xpos, this.ypos, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.arc(this.xpos + 64, this.ypos + 64, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.arc(this.xpos, this.ypos + 64, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.arc(this.xpos + 64, this.ypos, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.arc(this.xpos + 32, this.ypos + 32, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.fillStyle = bloodctx.createPattern(tempcanvas, "repeat");
				bloodctx.fill();
				return;
			}


			if (this.deadwaystype == 3) {
				this.xpos += this.bulletkilledx;
				this.ypos += this.bulletkilledy;
				bloodctx.beginPath();
				bloodctx.arc(this.xpos + 32, this.ypos + 32, this.deadwayscirclesize, 0, 2 * Math.PI);
				bloodctx.fillStyle = bloodctx.createPattern(tempcanvas, "repeat");
				bloodctx.fill();
				return;
			}

		}

		/*
		var tempcanvas = document.createElement("canvas");
		tempcanvas.width = 64;
		tempcanvas.height = 64;

		var tempctx = tempcanvas.getContext("2d");
		*/


		var bloodgraphics = Array.from(Array(100), () => new Array(2));

		for (var b = 0; b< 100; b++) {
			

			bloodgraphics[b][0] = document.createElement("canvas");
			bloodgraphics[b][0].width = 64;
			bloodgraphics[b][0].height = 64;
			bloodgraphics[b][1] = bloodgraphics[b][0].getContext("2d");


			bloodgenerationloader.call({
				deadwaystype: 0, xpos: 300, bulletkilledx: 0, ypos: 300,
				bulletkilledy: 0, deadwayscirclesize: 32,
				deadways: b, deadwaysamount: 3,
				deadwayscircleadd: 2, size: 32
			});

			bloodgraphics[b][1].drawImage(tempcanvas, 0, 0, 64, 64);

		}
		/*
		for (var b = 0; b < 10; b++) {

			bloodctx.drawImage(bloodgraphics[Math.floor(Math.random() * 100)][0], Math.floor(Math.random() * 600), Math.floor(Math.random() * 600));

		}
		*/

		function bloodgenerationloader() {

			nukedtimepattern++;

			this.deadways += this.deadwaysamount;
			this.deadwayscirclesize += this.deadwayscircleadd;

			if (nuked == 0 && nukedtimer > 99 || Number.isInteger(nukedtimepattern / zombies.length)) {



				for (let x = 0; x < 64 * 64 * 4; x += 4) {


					v = Math.floor(Math.random() * 255)

					if (v > 200 - this.deadways * 1.5 || (nukedtimer < 50 && v > 50)) {
						imgdata.data[x] = 150 + Math.floor(Math.random() * 100);
						if (nukedtimer < 0) {
							imgdata.data[x] = 200 + Math.floor(Math.random() * 55);
						}
						imgdata.data[x + 1] = Math.floor(Math.random() * 40);
						imgdata.data[x + 2] = Math.floor(Math.random() * 40);
						imgdata.data[x + 3] = 255;
					}
					else {

						imgdata.data[x] = 185;
						imgdata.data[x + 1] = 185; //// 175 guts
						imgdata.data[x + 2] = 185;
						imgdata.data[x + 3] = Math.floor(Math.random()*255);
					}


				}




				tempctx.putImageData(imgdata, 0, 0);
			}



			/*
			if (this.deadwaystype == 0) {
				this.xpos += this.bulletkilledx;
				this.ypos += this.bulletkilledy;
				bloodctx.beginPath();
				bloodctx.arc(this.xpos + this.size[0] / 2, this.ypos + this.size[1] / 2, this.deadwayscirclesize, 0, 2 * Math.PI);
				bloodctx.fillStyle = bloodctx.createPattern(tempcanvas, "repeat");
				bloodctx.fill();
				return;
			}

			if (this.deadwaystype == 1) {
				this.xpos += this.bulletkilledx;
				this.ypos += this.bulletkilledy;

				this.xpostwo += this.bulletkilledxtwo;
				this.ypostwo += this.bulletkilledytwo;

				bloodctx.beginPath();
				bloodctx.arc(this.xpos, this.ypos, this.deadwayscirclesize / 2, 0, 2 * Math.PI);
				bloodctx.arc(this.xpostwo, this.ypostwo, this.deadwayscirclesize / 2, 0, 2 * Math.PI);
				bloodctx.fillStyle = bloodctx.createPattern(tempcanvas, "repeat");
				bloodctx.fill();
				return;
			}

			if (this.deadwaystype == 2) {
				this.xpos += this.bulletkilledx;
				this.ypos += this.bulletkilledy;
				bloodctx.beginPath();
				bloodctx.arc(this.xpos, this.ypos, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.arc(this.xpos + 64, this.ypos + 64, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.arc(this.xpos, this.ypos + 64, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.arc(this.xpos + 64, this.ypos, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.arc(this.xpos + 32, this.ypos + 32, this.deadwayscirclesize / 3, 0, 2 * Math.PI);
				bloodctx.fillStyle = bloodctx.createPattern(tempcanvas, "repeat");
				bloodctx.fill();
				return;
			}


			if (this.deadwaystype == 3) {
				this.xpos += this.bulletkilledx;
				this.ypos += this.bulletkilledy;
				bloodctx.beginPath();
				bloodctx.arc(this.xpos + 32, this.ypos + 32, this.deadwayscirclesize, 0, 2 * Math.PI);
				bloodctx.fillStyle = bloodctx.createPattern(tempcanvas, "repeat");
				bloodctx.fill();
				return;
			}
			*/
		}

		function shoot() {

			if (shots[0][0] !== 0) {
				ctx.beginPath();
				ctx.moveTo(640, 360);
				ctx.lineTo(shots[0][0], shots[0][1])
				//ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(640, 360);
				ctx.lineTo(shots[0][0], 360)
				//ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(640 - shots[0][0], 360);
				ctx.lineTo(640 - shots[0][0], shots[0][1])
				//ctx.stroke();
			}

			if (bullet[0] !== 0) {
				m = rotation / 360 * 32;
				//n = rotation / 360 * 32;
				m = 32;
				n = 32;

				ctx.fillStyle = "black";
				ctx.fillRect(bullet[0], bullet[1], 5, 5);

				ctx.translate(xpos + m, ypos + n);
				ctx.rotate(rotation * Math.PI / 180);
				ctx.drawImage(tank, -m, -n, 64, 64);
				ctx.rotate(rotation * Math.PI / 180 * -1);
				ctx.translate(-xpos - m, -ypos - n);

				e = 2 + 50;
				var xdif = bullet[0] - circlex;
				var ydif = bullet[1] - circley

				if (e > Math.sqrt((xdif * xdif) + (ydif * ydif))) {
					ctx.beginPath();
					ctx.arc(circlex, circley, 50, 0, 2 * Math.PI);
					ctx.fillStyle = "red";
					ctx.fill();
					circlex = Math.random() * 1100;
					circley = Math.random() * 600;
				}
				else {
					bullet[0] += bullet[2];
					bullet[1] += bullet[3];
				}
			}

		}


		document.addEventListener("touchstart", touchstart, { passive: false });


		function touchstart(e) {

			shots[0][0] = e.touches[0].clientX - 32;
			shots[0][1] = e.touches[0].clientY - 32;

			bullet[0] = xpos;
			bullet[1] = ypos;

			x = shots[0][0] - xpos;
			y = shots[0][1] - ypos;

			z = Math.atan2(y, x);

			if (x > 0) {
				a = 10;
			}
			else {
				a = -10;
			}

			g = z * 180 / Math.PI;


			if (Math.abs(g) > 90) {
				bullet[2] = 10 * (90 - Math.abs(g)) / 90;
			}
			else {
				bullet[2] = 10 * (90 - Math.abs(g)) / 90;
			}


			if (g < 0) {

				bullet[3] = -a + bullet[2];
			}
			else {
				bullet[3] = a - bullet[2];

			}


			if (x < 0) {
				bullet[3] *= -1;
			}


			x = shots[0][0] - xpos;
			y = shots[0][1] - ypos;

			z = Math.atan2(y, x);

			g = z * 180 / Math.PI;
			//console.log(g)


			if (x < 0 && g > 0) {

				bullet[2] = 10 * (90 - Math.abs(g)) / 90;
				bullet[3] = (-10 - bullet[2]) * -1;
			}

			if (x < 0 && g < 0) {
				bullet[2] = 10 * (90 - Math.abs(g)) / 90;
				bullet[3] = (-10 - bullet[2]);
			}

			//console.log(g)

			if (g < 0 && g < -90) {
				g = 180 - Math.abs(g) + 180;
			}
			if (g < 0 && g > -90) {
				g = 90 - Math.abs(g) + 270;
			}


			t = (g) * Math.PI / 180;


			rotation = g;


			if (g > 180 && g < 270) {
				bullet[0] = xpos - Math.sin(t) * 32;
				bullet[1] = ypos - Math.cos(t) * 32;
			}
			if (g > 270 && g < 360) {
				bullet[0] = xpos - Math.sin(t) * 32;
				bullet[1] = ypos + Math.cos(t) * 32;
			}
			if (g > 0 && g < 90) {
				bullet[0] = xpos + Math.sin(t) * 32;
				bullet[1] = ypos + Math.cos(t) * 32;
			}
			if (g > 90 && g < 180) {
				bullet[0] = xpos + Math.sin(t) * 32;
				bullet[1] = ypos - Math.cos(t) * 32;
			}


			bullet[2] = Math.cos(t) * 10;
			bullet[3] = Math.sin(t) * 10;


			//console.log(bullet[3])

			//bullet[2] = Math.sin(z) * (x / y);

			//console.log(Math.sin(2 * Math.PI * (g)))


		}

		function shooter() {

			let g = rotation;
			t = (g) * Math.PI / 180;

			if (g > 180 && g < 270) {
				bullet[0] = xpos - Math.sin(t) * 32;
				bullet[1] = ypos - Math.cos(t) * 32;
			}
			if (g > 270 && g < 360) {
				bullet[0] = xpos - Math.sin(t) * 32;
				bullet[1] = ypos + Math.cos(t) * 32;
			}
			if (g > 0 && g < 90) {
				bullet[0] = xpos + Math.sin(t) * 32;
				bullet[1] = ypos + Math.cos(t) * 32;
			}
			if (g > 90 && g < 180) {
				bullet[0] = xpos + Math.sin(t) * 32;
				bullet[1] = ypos - Math.cos(t) * 32;
			}


			bullet[2] = Math.cos(t) * 10;
			bullet[3] = Math.sin(t) * 10;

			bullets.push(new bulletshot(bullet[0], bullet[1], bullet[2], bullet[3], g));


		}


		document.addEventListener("keydown", keyDown, false);

		var varied = 0;

		function keyDown(e) {
			if (e.keyCode == 68) {

				xpos += 6;
			}
			if (e.keyCode == 65) {

				xpos -= 6;
			}
			if (e.keyCode == 83) {

				ypos += 6;
			}
			if (e.keyCode == 87) {

				ypos -= 6;
			}
			if (e.keyCode == 78) {

				nuke();
			}
			if (e.keyCode == 77) {

				zombietimer = 1;
			}
			if (e.keyCode == 66) {

				if (boss == 0) {
					bossspawn();
				}
				else if (boss == 1) {
					boss = 0;
				}
			}

		

			if (e.keyCode == 49) {
				players[0].weapon[0] = 1;
				players[0].weapon[1] = -5;
				for (let x = 0; x < 3; x++) {
					players[0].weapon[x] = weaponslist[5][x];
				}
				players[0].weaponbullets=list[5][3];
			}
			if (e.keyCode == 50) {
				players[0].weapon[0] = 0.3;
				players[0].weapon[1] = -1;
				players[0].weapon[2] = 1;
				players[0].weaponbullets = 200;
			}
			if (e.keyCode == 51) {
				players[0].weapon[0] = 2;
				players[0].weapon[1] = 0;
			}
			//////spreadshot!
			if (e.keyCode == 52) {
				players[0].weapon[0] = 1;
				players[0].weapon[1] = -10;
				players[0].weapon[2] = 2;
				players[0].weaponbullets = 50;
			}
			//////buckshot!
			if (e.keyCode == 53) {
				players[0].weapon[0] = 1;
				players[0].weapon[1] = -20;
				players[0].weapon[2] = 3;
				players[0].weaponbullets = 20;
			}
			//////laser!
			if (e.keyCode == 54) {
				players[0].weapon[0] = 3;
				players[0].weapon[1] = -25;
				players[0].weapon[2] = 4;
				players[0].weaponbullets = 10;
			}
			////super laser
			if (e.keyCode == 55) {
				players[0].weapon[0] = 5;
				players[0].weapon[1] = -30;
				players[0].weapon[2] = 5;
				players[0].weaponbullets = 5;
			}
			if (e.keyCode == 56) {
				players[0].weapon[0] = 10;
				players[0].weapon[1] = -40;
				players[0].weapon[2] = 6;
				players[0].weaponbullets = 3;
			}
			if (e.keyCode == 70) {
				players[0].weapon[0] = 10;
				players[0].weapon[1] = -40;
				players[0].weapon[2] = 7;
				players[0].weaponbullets = 10;
			}
			if (e.keyCode == 71) {

				flames.push(new flamegraphic(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 680)));
				flames.push(new flamegraphic(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 680)));
				flames.push(new flamegraphic(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 680)));
			}
			if (e.keyCode == 72) {

				sprinklers.push(new sprinkler(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 680)));
				sprinklers.push(new sprinkler(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 680)));
				sprinklers.push(new sprinkler(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 680)));
			}

			if (e.keyCode == 48) {
				varied = 1;
			}
			if (e.keyCode == 57) {
				varied = 0;
			}

		}

		setInterval(main, 16);

	</script>


</body>
</html>
