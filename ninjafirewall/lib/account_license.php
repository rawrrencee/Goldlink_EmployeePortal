<?php
// +-------------------------------------------------------------------+
// | NinjaFirewall (Pro Edition)                                       |
// |                                                                   |
// | (c) NinTechNet - https://nintechnet.com/                          |
// |                                                                   |
// +-------------------------------------------------------------------+
// | This program is free software: you can redistribute it and/or     |
// | modify it under the terms of the GNU General Public License as    |
// | published by the Free Software Foundation, either version 3 of    |
// | the License, or (at your option) any later version.               |
// |                                                                   |
// | This program is distributed in the hope that it will be useful,   |
// | but WITHOUT ANY WARRANTY; without even the implied warranty of    |
// | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     |
// | GNU General Public License for more details.                      |
// +-------------------------------------------------------------------+

if (! defined( 'NFW_ENGINE_VERSION' ) ) { die( 'Forbidden' ); }

html_header();
?>
<div class="col-sm-12 text-left">
	<h3><?php echo _('Account > License') ?></h3>
	<br />
	<h4><?php echo _('Current License') ?></h4>

		<table width="100%" class="table table-nf">
			<tr>
				<td width="40%" align="left" ><?php echo _('Expiration date') ?></td>
				<td width="5%" align="center" >&nbsp;</td>
				<td width="55%">&nbsp;<?php echo _('N/A') ?></td>
			</tr>
			<tr>
				<td width="40%" align="left"><?php echo _('License Number') ?></td>
				<td width="5%" align="center" >&nbsp;</td>
				<td width="55%"><?php
					printf(
						_('Pro Edition (upgrade to %s)'),
						'<a href="https://nintechnet.com/ninjafirewall/pro-edition/">Pro+ Edition</a>'
					);
				?><br /><br />
				<input class="btn btn-sm btn-success" type="submit" disabled value="<?php echo _('Check License Validity') ?>" />
				</td>
			</tr>
		</table>
</div>
<?php

html_footer();

// ---------------------------------------------------------------------
// EOF
