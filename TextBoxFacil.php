<?php
namespace Stanford\TextBoxFacil;

class TextBoxFacil extends \ExternalModules\AbstractExternalModule
{
	public function __construct() { parent::__construct(); }

	function hook_every_page_top($project_id)
	{

		?>
		<!-- TextBoxFacil Module -->
		<link rel="stylesheet" href="<?= $this->getUrl("css/TextBoxFacil.css"); ?>">
		<script src="<?= $this->getUrl("js/hotkeys.js"); ?>"> </script>
		<script src="<?= $this->getUrl("js/TextBoxFacil.js"); ?>"> </script>
		<?php
	}
}

?>