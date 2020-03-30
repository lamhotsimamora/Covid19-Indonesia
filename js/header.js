function _header(){
	return `<nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <a class="navbar-brand" href="."  style="color: white">Home</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="provinsi.html" style="color: white">Provinsi<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public" target="_blank" style="color: white">WHO <span class="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
</nav>`
}

Garuda('_header').setHtml(_header())