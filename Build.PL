use Module::Build::JSAN::Installable;

my $build = Module::Build::JSAN::Installable->new(
	module_name    => 'ExtX.Reference.Slot',
	create_makefile_pl => 'passthrough',
	dist_version   => 0.01,
	dist_author   => 'SamuraiJack',
	dist_abstract  => 'Extension for accessing ExtJS hierarchy components with mnemonic names',
	license        => 'perl',
);

$build->create_build_script;

