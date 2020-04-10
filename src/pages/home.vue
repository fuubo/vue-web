<template>
  <div class="home">
    <!-- Main Content -->
    <div class="content-box">
      <!-- Hero Section -->
      <section class="section section-hero">
        <div class="hero-box">
          <div class="container">
            <div class="hero-text align-center">
              <h1>探索大自然的美</h1>
            </div>
            <form class="destinations-form">
              <div class="input-line">
                <input
                  type="text"
                  name="destination"
                  value
                  class="form-input check-value"
                  placeholder="试试搜索想要去的城市？"
                />
                <button
                  type="button"
                  name="destination-submit"
                  class="form-submit btn btn-special"
                >搜索活动</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Statistics Box -->
        <div class="container">
          <div class="statistics-box">
            <div class="statistics-item">
              <span class="value">2,300</span>
              <p class="title">目的地</p>
            </div>

            <div class="statistics-item">
              <span class="value">1,000</span>
              <p class="title">城市</p>
            </div>

            <div class="statistics-item">
              <span class="value">35,000</span>
              <p class="title">团队</p>
            </div>

            <div class="statistics-item">
              <span class="value">50,000</span>
              <p class="title">笔记</p>
            </div>
          </div>
        </div>
      </section>
      <!-- Destinations Section -->
      <section class="section section-destination">
        <!-- Title -->
        <div class="section-title">
          <div class="container">
            <h2 class="title">最新户外活动推荐</h2>
            <p class="sub-title">2020年3月</p>
          </div>
        </div>

        <!-- Content -->
        <b-container>
          <div class="col-md-16 col-xs-24">
            <div class="destination-box">
              <div class="box-cover">
                <a href="#">
                  <img src="../assets/img/destination-1.jpg" alt="destination image" />
                </a>
              </div>
              <span class="boats-qty icon-location">FINDERJ</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="city">探索加拿大的孤岛</h4>
                  <p class="country">深入了解著名的探险家和她在该领域的合作伙伴关系</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-8 col-sm-12 col-xs-24">
            <div class="destination-box">
              <div class="box-cover">
                <a href="#">
                  <img src="../assets/img/destination-2.jpg" alt="destination image" />
                </a>
              </div>

              <span class="boats-qty no-icon icon-location">FINDERJ</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="city">Ibiza</h4>
                  <p class="country">Spain</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-8 col-sm-12 col-xs-24">
            <div class="destination-box">
              <div class="box-cover">
                <a href="#">
                  <img src="../assets/img/destination-3.jpg" alt="destination image" />
                </a>
              </div>

              <span class="boats-qty">543</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="city">Palma de Mallorca</h4>
                  <p class="country">Spain</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-8 col-sm-12 col-xs-24">
            <div class="destination-box">
              <div class="box-cover">
                <a href="#">
                  <img src="../assets/img/destination-4.jpg" alt="destination image" />
                </a>
              </div>

              <span class="boats-qty">495</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="city">Portofino</h4>
                  <p class="country">Italy</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-8 col-sm-12 col-xs-24">
            <div class="destination-box">
              <div class="box-cover">
                <a href="#">
                  <img src="../assets/img/destination-5.jpg" alt="destination image" />
                </a>
              </div>

              <span class="boats-qty">402</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="city">Port Hercules</h4>
                  <p class="country">Monaco</p>
                </div>
              </div>
            </div>
          </div>

          <div v-show="showMoreA">
            <div class="col-md-8 col-sm-12 col-xs-24">
              <div class="destination-box">
                <div class="box-cover">
                  <a href="#">
                    <img src="../assets/img/destination-4.jpg" alt="destination image" />
                  </a>
                </div>

                <span class="boats-qty">495</span>

                <div class="box-details">
                  <div class="box-meta">
                    <h4 class="city">Portofino</h4>
                    <p class="country">Italy</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8 col-sm-12 col-xs-24">
              <div class="destination-box">
                <div class="box-cover">
                  <a href="#">
                    <img src="../assets/img/destination-5.jpg" alt="destination image" />
                  </a>
                </div>

                <span class="boats-qty">402</span>

                <div class="box-details">
                  <div class="box-meta">
                    <h4 class="city">Port Hercules</h4>
                    <p class="country">Monaco</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8 col-sm-12 col-xs-24">
              <div class="destination-box">
                <div class="box-cover">
                  <a href="#">
                    <img src="../assets/img/destination-3.jpg" alt="destination image" />
                  </a>
                </div>

                <span class="boats-qty">543</span>

                <div class="box-details">
                  <div class="box-meta">
                    <h4 class="city">Palma de Mallorca</h4>
                    <p class="country">Spain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="align-center">
            <b-button @click="showMore1"  variant="outline-dark">
              <span class="text">查看更多</span>
            </b-button>
          </div>
        </b-container>
      </section>

      <!-- Boats Section -->
      <section class="section section-boats">
        <!-- Title -->
        <div class="section-title">
          <div class="container">
            <h2 class="title">极限运动</h2>
            <p class="sub-title">潜水、滑雪、攀岩、滑翔伞</p>
          </div>
        </div>

        <!-- Content -->
        <b-container>
          <div class="col-sm-12 col-xs-24">
            <div class="boat-box">
              <div class="box-cover">
                <img src="../assets/img/boat-1.jpg" alt="destination image" />
              </div>

              <span class="boat-price">€580 / day</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="boat-name">Delphia 47</h4>
                  <ul class="clean-list boat-meta">
                    <li class="location">Gdansk, Poland</li>
                    <li class="berths">8 Berths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-xs-24">
            <div class="boat-box">
              <div class="box-cover">
                <img src="../assets/img/boat-2.jpg" alt="destination image" />
              </div>

              <span class="boat-price">€950 / day</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="boat-name">Sense 55</h4>
                  <ul class="clean-list boat-meta">
                    <li class="location">Portofino, Itali</li>
                    <li class="berths">12 Berths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-xs-24">
            <div class="boat-box">
              <div class="box-cover">
                <img src="../assets/img/boat-3.jpg" alt="destination image" />
              </div>

              <span class="boat-price">€820 / day</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="boat-name">Cruiser 51</h4>
                  <ul class="clean-list boat-meta">
                    <li class="location">Palma de Mallorca, Spain</li>
                    <li class="berths">10 Berths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-xs-24">
            <div class="boat-box">
              <div class="box-cover">
                <img src="../assets/img/boat-4.jpg" alt="destination image" />
              </div>

              <span class="boat-price">€400 / day</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="boat-name">Cruiser 41S</h4>
                  <ul class="clean-list boat-meta">
                    <li class="location">Lisbon, Portugal</li>
                    <li class="berths">8 Berths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div v-show="showMoreB">
            <div class="col-sm-12 col-xs-24">
              <div class="boat-box">
                <div class="box-cover">
                  <img src="../assets/img/boat-2.jpg" alt="destination image" />
                </div>

                <span class="boat-price">€950 / day</span>

                <div class="box-details">
                  <div class="box-meta">
                    <h4 class="boat-name">Sense 55</h4>
                    <ul class="clean-list boat-meta">
                      <li class="location">Portofino, Itali</li>
                      <li class="berths">12 Berths</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-xs-24">
              <div class="boat-box">
                <div class="box-cover">
                  <img src="../assets/img/boat-1.jpg" alt="destination image" />
                </div>

                <span class="boat-price">€580 / day</span>

                <div class="box-details">
                  <div class="box-meta">
                    <h4 class="boat-name">Delphia 47</h4>
                    <ul class="clean-list boat-meta">
                      <li class="location">Gdansk, Poland</li>
                      <li class="berths">8 Berths</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="align-center">
            <b-button variant="outline-dark" @click="showMore2">
              <span class="text-small">查看更多</span>
            </b-button>
          </div>
        </b-container>
      </section>

      <!-- Parallax Box -->
      <div class="parallax-box">
        <div class="container">
          <div class="text align-center">
            <h1>与我们合作</h1>
            <p>我们渴望每位同样专注于户外运动的供应商加盟</p>

            <a href="#" class="btn btn-special no-icon size-2x">发布活动</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      showMoreA: false,
      showMoreB: false
    };
  },
  methods: {
    showMore1() {
      this.showMoreA = true;
    },

    showMore2() {
      this.showMoreB = true;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
